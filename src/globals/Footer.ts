import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'ADMIN' },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'linkGroups',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'X / Twitter', value: 'x' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'newsletterBlurb', type: 'textarea' },
    { name: 'copyright', type: 'text' },
  ],
}
