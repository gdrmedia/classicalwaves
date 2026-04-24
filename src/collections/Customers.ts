import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'createdAt'],
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    create: () => true,
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'customers') return { id: { equals: user.id } }
      return false
    },
    update: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'customers') return { id: { equals: user.id } }
      return false
    },
    delete: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: { readOnly: true, description: 'Set by the Stripe webhook after first purchase.' },
    },
    {
      name: 'marketingOptIn',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Whether the customer opted into marketing emails.' },
    },
  ],
}
