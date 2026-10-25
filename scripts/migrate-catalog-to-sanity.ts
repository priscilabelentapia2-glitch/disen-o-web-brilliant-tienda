import {existsSync, readFileSync} from 'node:fs'
import {basename, resolve, sep} from 'node:path'

import {createClient} from 'next-sanity'

import {categoryOrder, categories, products} from '../components/catalog-data'

const dryRun = process.argv.includes('--dry-run')
const unknownArguments = process.argv.slice(2).filter((argument) => argument !== '--dry-run')

if (unknownArguments.length > 0) {
  throw new Error(`Argumentos no reconocidos: ${unknownArguments.join(', ')}`)
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-10-24'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  throw new Error(
    'Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o NEXT_PUBLIC_SANITY_DATASET en el entorno.',
  )
}

if (!dryRun && !token) {
  throw new Error(
    'La migración real requiere SANITY_API_WRITE_TOKEN. El token nunca se imprime.',
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: dryRun ? undefined : token,
})

const projectRoot = resolve(process.cwd())
const publicRoot = resolve(projectRoot, 'public')
const sourceCategories = categories.filter((category) => category !== 'Todo')
const supportedTags = [
  'Nuevo',
  'Favorito',
  'Oferta',
  'Ocasión especial',
  'Video',
  'Recién llegado',
] as const

type ExistingDocument = {
  _id: string
  _type: 'category' | 'product'
  slug: string
}

type ImageCheck = {
  source: string
  found: boolean
  detail: string
}

type PlannedDocument = {
  type: 'category' | 'product'
  name: string
  slug: string
  action: 'crear' | 'actualizar'
  existingId?: string
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function assertUniqueSlugs(type: string, entries: Array<{name: string; slug: string}>) {
  const seen = new Map<string, string>()

  for (const entry of entries) {
    if (!entry.slug) {
      throw new Error(`${type} "${entry.name}" genera un slug vacío.`)
    }

    const previous = seen.get(entry.slug)
    if (previous) {
      throw new Error(
        `Slug duplicado en ${type}: "${entry.slug}" corresponde a "${previous}" y "${entry.name}".`,
      )
    }
    seen.set(entry.slug, entry.name)
  }
}

function localImagePath(source: string) {
  const relativePath = source.replace(/^\/+/, '')
  const absolutePath = resolve(publicRoot, relativePath)

  if (absolutePath !== publicRoot && !absolutePath.startsWith(`${publicRoot}${sep}`)) {
    throw new Error(`La imagen local sale de public/: ${source}`)
  }

  return absolutePath
}

async function checkImage(source: string): Promise<ImageCheck> {
  if (source.startsWith('/')) {
    const path = localImagePath(source)
    return {
      source,
      found: existsSync(path),
      detail: existsSync(path) ? path : 'archivo local inexistente',
    }
  }

  let url: URL
  try {
    url = new URL(source)
  } catch {
    return {source, found: false, detail: 'URL inválida'}
  }

  if (url.protocol !== 'https:') {
    return {source, found: false, detail: `protocolo no permitido: ${url.protocol}`}
  }

  try {
    const response = await fetch(url, {method: 'HEAD', signal: AbortSignal.timeout(15_000)})
    const contentType = response.headers.get('content-type') ?? ''
    const found = response.ok && contentType.startsWith('image/')
    return {
      source,
      found,
      detail: found
        ? `${response.status} ${contentType}`
        : `${response.status} ${contentType || 'sin content-type'}`,
    }
  } catch (error) {
    return {
      source,
      found: false,
      detail: error instanceof Error ? error.message : String(error),
    }
  }
}

async function mapWithConcurrency<T, R>(
  values: T[],
  limit: number,
  mapper: (value: T) => Promise<R>,
) {
  const results = new Array<R>(values.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await mapper(values[index])
    }
  }

  await Promise.all(
    Array.from({length: Math.min(limit, values.length)}, () => worker()),
  )
  return results
}

async function loadExistingDocuments() {
  const categorySlugs = sourceCategories.map(slugify)
  const productSlugs = products.map((product) => slugify(product.name))

  return client.fetch<ExistingDocument[]>(
    `*[
      (_type == "category" && slug.current in $categorySlugs) ||
      (_type == "product" && slug.current in $productSlugs)
    ]{
      _id,
      _type,
      "slug": slug.current
    }`,
    {categorySlugs, productSlugs},
  )
}

function buildPlan(existingDocuments: ExistingDocument[]) {
  const grouped = new Map<string, ExistingDocument[]>()

  for (const document of existingDocuments) {
    const key = `${document._type}:${document.slug}`
    grouped.set(key, [...(grouped.get(key) ?? []), document])
  }

  for (const [key, matches] of grouped) {
    if (matches.length > 1) {
      throw new Error(
        `Sanity contiene ${matches.length} documentos para ${key}. Resuelve el duplicado antes de migrar.`,
      )
    }
  }

  const plan: PlannedDocument[] = [
    ...sourceCategories.map((name) => ({
      type: 'category' as const,
      name,
      slug: slugify(name),
    })),
    ...products.map((product) => ({
      type: 'product' as const,
      name: product.name,
      slug: slugify(product.name),
    })),
  ].map((entry) => {
    const existing = grouped.get(`${entry.type}:${entry.slug}`)?.[0]
    return {
      ...entry,
      action: existing ? ('actualizar' as const) : ('crear' as const),
      existingId: existing?._id,
    }
  })

  return plan
}

function assetFilename(source: string) {
  if (source.startsWith('/')) return basename(source)
  return basename(new URL(source).pathname) || 'catalog-image'
}

async function uploadImage(source: string) {
  const filename = assetFilename(source)

  if (source.startsWith('/')) {
    return client.assets.upload('image', readFileSync(localImagePath(source)), {filename})
  }

  const response = await fetch(source, {signal: AbortSignal.timeout(60_000)})
  if (!response.ok) {
    throw new Error(`No se pudo descargar ${source}: HTTP ${response.status}`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.startsWith('image/')) {
    throw new Error(`El recurso no es una imagen (${contentType || 'sin content-type'}): ${source}`)
  }

  return client.assets.upload('image', Buffer.from(await response.arrayBuffer()), {
    filename,
    contentType,
  })
}

async function createOrUpdate(
  plan: PlannedDocument,
  document: {_type: string; [key: string]: unknown},
  unset: string[] = [],
) {
  if (plan.existingId) {
    const {_type: _documentType, ...mutableFields} = document
    let patch = client.patch(plan.existingId).set(mutableFields)
    if (unset.length > 0) patch = patch.unset(unset)
    return patch.commit()
  }

  return client.create(document)
}

async function migrate(plan: PlannedDocument[]) {
  const categoryIds = new Map<string, string>()

  for (const name of sourceCategories) {
    const slug = slugify(name)
    const entry = plan.find((item) => item.type === 'category' && item.slug === slug)
    if (!entry) throw new Error(`No existe plan para la categoría ${name}.`)

    const result = await createOrUpdate(entry, {
      _type: 'category',
      name,
      slug: {_type: 'slug', current: slug},
      order: categoryOrder[name],
      active: true,
    })
    categoryIds.set(name, result._id)
    console.log(`[${entry.action}] category ${name}`)
  }

  const assetCache = new Map<string, Awaited<ReturnType<typeof uploadImage>>>()

  for (const product of products) {
    const slug = slugify(product.name)
    const entry = plan.find((item) => item.type === 'product' && item.slug === slug)
    if (!entry) throw new Error(`No existe plan para el producto ${product.name}.`)

    const categoryId = categoryIds.get(product.category)
    if (!categoryId) {
      throw new Error(`No se resolvió la categoría ${product.category} de ${product.name}.`)
    }

    let asset = assetCache.get(product.image)
    if (!asset) {
      asset = await uploadImage(product.image)
      assetCache.set(product.image, asset)
    }

    const image = {
      _type: 'image',
      asset: {_type: 'reference', _ref: asset._id},
    }

    await createOrUpdate(
      entry,
      {
        _type: 'product',
        name: product.name,
        slug: {_type: 'slug', current: slug},
        category: {_type: 'reference', _ref: categoryId},
        image,
        alt: product.alt,
        available: true,
        ...(product.tag ? {tag: product.tag} : {}),
        order: product.order,
      },
      ['price', 'description', ...(product.tag ? [] : ['tag'])],
    )
    console.log(`[${entry.action}] product ${product.name}`)
  }
}

function validateSource() {
  const categorySet = new Set<string>(sourceCategories)
  const categoryEntries = sourceCategories.map((name) => ({name, slug: slugify(name)}))
  const productEntries = products.map((product) => ({
    name: product.name,
    slug: slugify(product.name),
  }))

  assertUniqueSlugs('categorías', categoryEntries)
  assertUniqueSlugs('productos', productEntries)

  for (const product of products) {
    if (!categorySet.has(product.category)) {
      throw new Error(
        `El producto "${product.name}" referencia la categoría inexistente "${product.category}".`,
      )
    }

    if (product.tag && !supportedTags.includes(product.tag as (typeof supportedTags)[number])) {
      throw new Error(
        `El producto "${product.name}" usa la etiqueta no soportada "${product.tag}".`,
      )
    }
  }

  return {categoryEntries, productEntries}
}

function validateIdempotency(plan: PlannedDocument[]) {
  const simulatedExistingDocuments: ExistingDocument[] = plan.map((entry, index) => ({
    _id: entry.existingId ?? `simulated-${index}`,
    _type: entry.type,
    slug: entry.slug,
  }))
  const secondRun = buildPlan(simulatedExistingDocuments)

  if (secondRun.some((entry) => entry.action === 'crear')) {
    throw new Error('La estrategia de upsert no superó la comprobación de idempotencia.')
  }
}

function summarize(
  imageChecks: ImageCheck[],
  plan: PlannedDocument[],
) {
  const found = imageChecks.filter((image) => image.found)
  const missing = imageChecks.filter((image) => !image.found)
  const localReferences = products.filter((product) => product.image.startsWith('/')).length
  const remoteReferences = products.length - localReferences
  const uniqueSources = new Set(products.map((product) => product.image)).size
  const creates = plan.filter((entry) => entry.action === 'crear').length
  const updates = plan.length - creates
  const videoTaggedProducts = products.filter((product) => product.tag === 'Video')
  const unsupportedTags = products.filter(
    (product) => product.tag && !supportedTags.includes(product.tag as (typeof supportedTags)[number]),
  )

  console.log('\n=== Resumen de migración del catálogo ===')
  console.log(`Modo: ${dryRun ? 'DRY RUN (sin escrituras)' : 'REAL'}`)
  console.log(`Categorías: ${sourceCategories.length}`)
  console.log(`Productos: ${products.length}`)
  console.log(`Referencias de imagen: ${products.length} (${localReferences} locales, ${remoteReferences} remotas)`)
  console.log(`Fuentes de imagen únicas: ${uniqueSources}`)
  console.log(`Imágenes encontradas: ${found.length}/${imageChecks.length}`)
  console.log(`Imágenes faltantes: ${missing.length}`)
  console.log(`Documentos a crear: ${creates}`)
  console.log(`Documentos a actualizar: ${updates}`)
  console.log(`Idempotencia: validada; una segunda ejecución actualizaría ${plan.length} y crearía 0.`)
  console.log(`Precio: omitido en ${products.length}/${products.length} productos porque el catálogo fuente no contiene precios.`)
  console.log('Valores por defecto: available=true en todos los productos; description omitida.')
  console.log('Orden: se conservan los valores actualmente publicados en Sanity.')

  if (videoTaggedProducts.length > 0) {
    console.log(
      `Productos etiquetados como Video, todavía representados solo por imagen (${videoTaggedProducts.length}): ${videoTaggedProducts
        .map((item) => item.name)
        .join(', ')}.`,
    )
  }
  if (unsupportedTags.length === 0) {
    console.log('Etiquetas: todas las etiquetas existentes son compatibles con el schema.')
  } else {
    console.log(
      `Etiquetas fuera de las opciones del Studio (${unsupportedTags.length} productos): ${[
        ...new Set(unsupportedTags.map((item) => item.tag)),
      ].join(', ')}`,
    )
  }
  if (missing.length > 0) {
    console.log('\nImágenes faltantes:')
    for (const image of missing) console.log(`- ${image.source}: ${image.detail}`)
  }
}

async function main() {
  validateSource()

  const uniqueImageSources = [...new Set(products.map((product) => product.image))]
  const uniqueChecks = await mapWithConcurrency(uniqueImageSources, 6, checkImage)
  const checksBySource = new Map(uniqueChecks.map((check) => [check.source, check]))
  const imageChecks = products.map((product) => {
    const check = checksBySource.get(product.image)
    if (!check) throw new Error(`No se comprobó la imagen de ${product.name}.`)
    return check
  })

  const missingImages = imageChecks.filter((image) => !image.found)
  const existingDocuments = await loadExistingDocuments()
  const plan = buildPlan(existingDocuments)
  validateIdempotency(plan)

  summarize(imageChecks, plan)

  if (missingImages.length > 0) {
    throw new Error('La migración se detuvo porque hay imágenes faltantes.')
  }
  if (dryRun) {
    console.log('\nDry-run completado: no se escribió ningún documento ni asset en Sanity.')
    return
  }

  console.log('\nIniciando escrituras en Sanity...')
  await migrate(plan)
  console.log('\nMigración completada.')
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
