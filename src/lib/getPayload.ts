import { getPayload as getPayloadBase } from 'payload'
import config from '@payload-config'

let cached: Awaited<ReturnType<typeof getPayloadBase>> | null = null

export async function getPayload() {
  if (!cached) {
    cached = await getPayloadBase({ config })
  }
  return cached
}
