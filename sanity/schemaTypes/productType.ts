import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Productos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      description: 'Ingresa el precio en pesos chilenos, sin puntos ni símbolo $. Ejemplo: 29990.',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description: 'Descripción accesible del contenido de la imagen.',
    }),
    defineField({
      name: 'available',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tag',
      title: 'Etiqueta',
      type: 'string',
      options: {
        list: [
          {title: 'Nuevo', value: 'Nuevo'},
          {title: 'Favorito', value: 'Favorito'},
          {title: 'Oferta', value: 'Oferta'},
          {title: 'Ocasión especial', value: 'Ocasión especial'},
          {title: 'Video', value: 'Video'},
          {title: 'Recién llegado', value: 'Recién llegado'},
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.name',
      price: 'price',
      media: 'image',
    },
    prepare({title, category, price, media}) {
      const formattedPrice =
        typeof price === 'number' ? `$${new Intl.NumberFormat('es-CL').format(price)}` : undefined
      const subtitle = [category, formattedPrice].filter(Boolean).join(' · ')

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
