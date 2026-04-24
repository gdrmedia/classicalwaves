// src/app/(storefront)/journal/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/payload.server'
import type { Media, Post } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Journal — Classical Waves' }

export default async function JournalPage() {
  const posts = await getPosts() as Post[]

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-stone-900 mb-12">Journal</h1>
      {posts.length === 0 ? (
        <p className="text-stone-500">No posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const hero = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
            return (
              <Link key={post.id} href={`/journal/${post.slug}`} className="group">
                {hero?.url && (
                  <div className="relative aspect-[4/3] bg-stone-100 mb-4 overflow-hidden">
                    <Image
                      src={hero.url}
                      alt={hero.alt ?? post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <p className="text-xs text-stone-400 mb-1">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : null}
                </p>
                <h2 className="font-medium text-stone-900 group-hover:underline">{post.title}</h2>
                {post.excerpt && (
                  <p className="mt-1 text-sm text-stone-500 line-clamp-2">{post.excerpt}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
