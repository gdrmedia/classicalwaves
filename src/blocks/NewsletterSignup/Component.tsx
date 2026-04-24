// src/blocks/NewsletterSignup/Component.tsx
'use client'
import type { NewsletterSignupBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function NewsletterSignupComponent({ heading, body, buttonText, anchor, padding, background }: NewsletterSignupBlock) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'block' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-xl mx-auto px-6 text-center">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-3">{heading}</h2>}
        {body && <p className="text-stone-500 mb-6">{body}</p>}
        {status === 'success' ? (
          <p className="text-stone-700">You&rsquo;re subscribed. Thank you!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-stone-900 text-white px-6 py-2.5 text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '…' : (buttonText ?? 'Subscribe')}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-2 text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </div>
    </BlockWrapper>
  )
}
