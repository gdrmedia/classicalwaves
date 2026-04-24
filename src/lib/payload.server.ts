// src/lib/payload.server.ts
import { getPayload } from '@/lib/getPayload'

export async function getGlobal<T extends 'header' | 'footer' | 'settings'>(slug: T, depth = 1) {
  const payload = await getPayload()
  return payload.findGlobal({ slug, depth })
}

export async function getPage(slug: string, draft = false) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getPost(slug: string, draft = false) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    draft,
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getPosts() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    limit: 20,
  })
  return docs
}

export async function getProducts() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'products',
    where: { status: { equals: 'published' } },
    depth: 1,
    limit: 100,
  })
  return docs
}

export async function getProductBySlug(slug: string, draft = false) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    draft,
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getPressMentions() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'press-mentions',
    sort: '-date',
    depth: 1,
    limit: 20,
  })
  return docs
}
