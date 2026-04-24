// src/app/(storefront)/journal/[slug]/page.tsx
import Image from 'next/image'
import { draftMode } from 'next/headers'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { getPost } from '@/lib/payload.server'
import { notFound } from 'next/navigation'
import type { Media, Post } from '@/payload-types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug) as Post | null
  if (!post) return {}
  return { title: `${post.title} — Classical Waves`, description: post.excerpt ?? undefined }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()

  const post = await getPost(slug, isDraft) as Post | null
  if (!post) notFound()

  const hero = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null

  return (
    <article>
      {hero?.url && (
        <div className="relative h-[50vh] bg-stone-100">
          <Image src={hero.url} alt={hero.alt ?? post.title} fill className="object-cover" priority sizes="100vw" />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xs text-stone-400 mb-2">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : null}
        </p>
        <h1 className="text-4xl font-semibold text-stone-900 mb-6">{post.title}</h1>
        {post.excerpt && <p className="text-lg text-stone-500 mb-8 border-l-2 border-stone-200 pl-4">{post.excerpt}</p>}
        {post.content && (
          <div className="prose prose-stone max-w-none">
            <RichText data={post.content} />
          </div>
        )}
      </div>
      {post.blocks && post.blocks.length > 0 && (
        <BlockRenderer blocks={post.blocks as any} />
      )}
    </article>
  )
}
