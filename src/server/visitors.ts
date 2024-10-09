'use server'

import { db } from './db'

export async function countVisitors(visitorId: string) {
  const sessionExists = await db
    .selectFrom('port_visitors')
    .where('visitor_id', '=', visitorId)
    .select('id')
    .executeTakeFirst()

  if (!sessionExists?.id) {
    const visitDate = new Date()
    visitDate.setHours(visitDate.getHours() - 3)

    await db
      .insertInto('port_visitors')
      .values({ visitor_id: visitorId, visit_date: visitDate })
      .execute()
  }
}

export async function getVisits() {
  const today = new Date()
  const last30Days = new Date(today)
  last30Days.setDate(today.getDate() - 30)

  const visits = await db
    .selectFrom('port_visitors')
    .select(['visit_date', 'id'])
    .where('visit_date', '>=', last30Days)
    .orderBy('visit_date', 'asc')
    .execute()

  const truncateDate = (date: string | Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    return `${day}/${month}`
  }

  const datesArray = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    return truncateDate(date)
  }).reverse()

  const groupedVisits = visits.reduce<Record<string, number>>((acc, visit) => {
    const date = truncateDate(visit.visit_date as Date)
    if (!acc[date]) {
      acc[date] = 0
    }
    acc[date] += 1
    return acc
  }, {})

  const formattedVisits = datesArray.map((date) => ({
    date,
    count: groupedVisits[date] || 0,
  }))

  const totalVisits = visits.length

  return {
    visits: formattedVisits,
    totalVisits,
  }
}
