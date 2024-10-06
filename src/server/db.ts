import { Database } from '@/lib/types'
import { createKysely } from '@vercel/postgres-kysely'

export const db = createKysely<Database>()
