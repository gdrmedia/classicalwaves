// src/blocks/ContactForm/Component.tsx
'use client'
import type { ContactFormBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactFormComponent({ heading, body, anchor, padding, background }: ContactFormBlock) {
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })

  function update(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-2xl mx-auto px-6">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-3">{heading}</h2>}
        {body && <p className="text-stone-500 mb-8">{body}</p>}
        {status === 'success' ? (
          <p className="text-stone-700 py-8">Message received — we&rsquo;ll be in touch soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input
                  required
                  value={fields.name}
                  onChange={update('name')}
                  className="w-full border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={fields.email}
                  onChange={update('email')}
                  className="w-full border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Subject</label>
              <input
                required
                value={fields.subject}
                onChange={update('subject')}
                className="w-full border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
              <textarea
                required
                rows={5}
                value={fields.message}
                onChange={update('message')}
                className="w-full border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-stone-900 text-white px-8 py-3 text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'error' && (
              <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </BlockWrapper>
  )
}
