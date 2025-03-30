import { Database } from '@/server/database.types'
import { createKysely } from '@vercel/postgres-kysely'

export const db = createKysely<Database>()
