import { draftMode, headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from '@/lib/getPayload'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const path = url.searchParams.get('path') || '/'

  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid path', { status: 400 })
  }

  const headers = await getHeaders()
  const payload = await getPayload()
  const { user } = await payload.auth({ headers })

  if (!user || user.collection !== 'users') {
    return new Response('Unauthorized', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
