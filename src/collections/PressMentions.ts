import type { CollectionConfig } from 'payload'

export const PressMentions: CollectionConfig = {
  slug: 'press-mentions',
  labels: { singular: 'Press Mention', plural: 'Press' },
  admin: {
    useAsTitle: 'publication',
    group: 'THE WEBSITE',
    defaultColumns: ['publication', 'date', 'url'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'publication', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'quote', type: 'textarea' },
    { name: 'url', type: 'text' },
    { name: 'date', type: 'date' },
  ],
}
