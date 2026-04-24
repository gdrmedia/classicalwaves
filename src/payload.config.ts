import { buildConfig } from 'payload'
import { Header } from './globals/Header.ts'
import { Footer } from './globals/Footer.ts'
import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Products } from './collections/Products.ts'
import { Customers } from './collections/Customers.ts'
import { Orders } from './collections/Orders.ts'
import { Pages } from './collections/Pages.ts'
import { Posts } from './collections/Posts.ts'
import { PressMentions } from './collections/PressMentions.ts'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers.ts'
import { ContactSubmissions } from './collections/ContactSubmissions.ts'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL!,
    },
    push: process.env.NODE_ENV === 'development',
  }),
  collections: [Users, Media, Products, Customers, Orders, Pages, Posts, PressMentions, NewsletterSubscribers, ContactSubmissions],
  globals: [Header, Footer],
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    }),
    // seoPlugin registered in Task 18 after pages/posts/products collections exist
  ],
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  telemetry: false,
})
