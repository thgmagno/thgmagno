'use server'

import { db } from './db'

export async function countVisitors(visitorId: string) {
  const sessionExists = await db
    .selectFrom('port_visitors')
    .where('visitor_id', '=', visitorId)
    .select('id')
    .executeTakeFirst()

  if (!sessionExists?.id) {
    await db
      .insertInto('port_visitors')
      .values({ visitor_id: visitorId, visit_date: new Date() })
      .execute()
  }
}
