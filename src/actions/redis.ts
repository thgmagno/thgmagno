'use server'

import { redis } from '@/lib/redis'
import { revalidatePath } from 'next/cache'

export async function getEntries() {
  const keys = await redis.keys('*')

  return await Promise.all(
    keys.map(async (key) => {
      const [value, ttl] = await Promise.all([redis.get(key), redis.ttl(key)])

      return { key, value, ttl }
    }),
  )
}

export async function deleteEntry(key: string) {
  await redis.del(key)
  revalidatePath('/')
}
