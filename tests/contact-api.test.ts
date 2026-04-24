// tests/contact-api.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockCreate = vi.fn().mockResolvedValue({ id: 'abc123' })

vi.mock('@/lib/getPayload', () => ({
  getPayload: () => Promise.resolve({ create: mockCreate }),
}))

const { POST } = await import('@/app/api/contact/route')

describe('POST /api/contact', () => {
  beforeEach(() => mockCreate.mockClear())

  it('returns 400 when required fields are missing', async () => {
    const req = new Request('http://test/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice' }),
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
  })

  it('creates a contact submission and returns 200', async () => {
    const req = new Request('http://test/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        email: 'alice@example.com',
        subject: 'Hello',
        message: 'Hi there',
      }),
    })
    const res = await POST(req as any)
    expect(res.status).toBe(200)
    expect(mockCreate).toHaveBeenCalledOnce()
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'contact-submissions',
        data: expect.objectContaining({ name: 'Alice', email: 'alice@example.com' }),
      }),
    )
  })
})
