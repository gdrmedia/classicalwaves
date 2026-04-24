import { describe, it, expect, beforeAll } from 'vitest'
import { runSeed } from '@/scripts/seed'
import { getPayload } from '@/lib/getPayload'

describe('seed script output', () => {
  beforeAll(async () => {
    await runSeed()
  })

  it('creates the home page', async () => {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
    })
    expect(result.totalDocs).toBe(1)
    expect(result.docs[0].title).toBe('Home')
  })

  it('creates at least one product', async () => {
    const payload = await getPayload()
    const result = await payload.find({ collection: 'products' })
    expect(result.totalDocs).toBeGreaterThanOrEqual(1)
  })

  it('populates the header global', async () => {
    const payload = await getPayload()
    const header = await payload.findGlobal({ slug: 'header' })
    expect(Array.isArray(header.navLinks)).toBe(true)
  })

  it('is idempotent — running twice does not duplicate', async () => {
    await runSeed()
    const payload = await getPayload()
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
    })
    expect(pages.totalDocs).toBe(1)
  })
})
