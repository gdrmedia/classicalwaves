import 'dotenv/config'
import { fileURLToPath } from 'url'
import { getPayload } from '../lib/getPayload.ts'

export async function runSeed() {
  const payload = await getPayload()

  // Home page
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  if (existingHome.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: { title: 'Home', slug: 'home', status: 'published' },
    })
    payload.logger.info('Created home page')
  }

  // About page
  const existingAbout = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  if (existingAbout.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: { title: 'About', slug: 'about', status: 'published' },
    })
    payload.logger.info('Created about page')
  }

  // Sample product (only if catalog is empty)
  const existingProducts = await payload.find({ collection: 'products', limit: 1 })
  if (existingProducts.totalDocs === 0) {
    await payload.create({
      collection: 'products',
      data: {
        title: 'Sample Linen Shirt',
        slug: 'sample-linen-shirt',
        status: 'published',
        basePrice: 8500,
        images: [],
        variants: [
          { size: 'S', color: 'Sand', sku: 'SLS-S-SAND', inventory: 10 },
          { size: 'M', color: 'Sand', sku: 'SLS-M-SAND', inventory: 10 },
          { size: 'L', color: 'Sand', sku: 'SLS-L-SAND', inventory: 10 },
        ],
      },
    })
    payload.logger.info('Created sample product')
  }

  // Header global
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navLinks: [
        { label: 'Shop', url: '/shop' },
        { label: 'Journal', url: '/journal' },
        { label: 'Lookbook', url: '/lookbook' },
        { label: 'About', url: '/about' },
      ],
      announcementBar: { enabled: false, text: '', link: '' },
    },
  })
  payload.logger.info('Updated header global')

  // Footer global
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      linkGroups: [
        {
          heading: 'Shop',
          links: [
            { label: 'All Products', url: '/shop' },
            { label: 'New Arrivals', url: '/shop' },
          ],
        },
        {
          heading: 'Support',
          links: [
            { label: 'Contact', url: '/contact' },
            { label: 'Shipping & Returns', url: '/shipping-returns' },
            { label: 'FAQ', url: '/faq' },
          ],
        },
      ],
      socialLinks: [],
      newsletterBlurb: 'Join the coastal letter.',
      copyright: `© ${new Date().getFullYear()} Classical Waves.`,
    },
  })
  payload.logger.info('Updated footer global')

  // Settings global
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      brandName: 'Classical Waves',
      commerce: {
        freeShippingThresholdCents: 7500,
        flatShippingRateCents: 800,
        supportEmail: 'support@classicalwaves.com',
      },
      emptyCartCopy: 'Your cart is empty. Start exploring the collection.',
    },
  })
  payload.logger.info('Updated settings global')

  payload.logger.info('Seed complete')
}

// Only run process.exit when invoked as CLI, not when imported by tests
const isCli = process.argv[1] === fileURLToPath(import.meta.url)
if (isCli) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed failed:', err)
      process.exit(1)
    })
}
