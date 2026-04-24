import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'brandName', type: 'text', required: true, defaultValue: 'Classical Waves' },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'commerce',
      type: 'group',
      fields: [
        { name: 'freeShippingThresholdCents', type: 'number', defaultValue: 7500 },
        { name: 'flatShippingRateCents', type: 'number', defaultValue: 800 },
        { name: 'supportEmail', type: 'email' },
      ],
    },
    {
      name: 'emptyCartCopy',
      type: 'text',
      defaultValue: 'Your cart is empty. Start exploring the collection.',
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'gaId', type: 'text', admin: { description: 'GA4 Measurement ID (G-XXXX).' } },
      ],
    },
  ],
}
