// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/getPayload'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { name, email, subject, message } = body
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  const payload = await getPayload()
  await payload.create({
    collection: 'contact-submissions',
    data: { name, email, subject, message, submittedAt: new Date().toISOString() },
  })

  return NextResponse.json({ success: true })
}
