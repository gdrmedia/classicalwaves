import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    group: 'THE SHOP',
    defaultColumns: ['title', 'basePrice', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => `/next/preview?path=/shop/${data?.slug ?? ''}`,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug — lowercase, dashes, no spaces. e.g. "linen-shirt-sand".' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    { name: 'description', type: 'richText' },
    {
      name: 'basePrice',
      type: 'number',
      required: true,
      min: 0,
      admin: { description: 'Price in USD cents. e.g. 4500 = $45.00.' },
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'variants',
      type: 'array',
      minRows: 1,
      admin: { description: 'Each variant is a size+color combo with its own inventory and SKU.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'size', type: 'text', required: true, admin: { width: '25%' } },
            { name: 'color', type: 'text', required: true, admin: { width: '25%' } },
            { name: 'sku', type: 'text', required: true, admin: { width: '25%' } },
            { name: 'inventory', type: 'number', required: true, min: 0, defaultValue: 0, admin: { width: '25%' } },
          ],
        },
        {
          name: 'priceOverride',
          type: 'number',
          min: 0,
          admin: { description: 'Only set if this variant has a different price from basePrice (cents).' },
        },
        {
          name: 'images',
          type: 'array',
          admin: { description: 'Optional: variant-specific images.' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
          ],
        },
      ],
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Shown in "You may also like" on product pages.' },
    },
  ],
}
