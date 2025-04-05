'use server'

import { prisma } from '@/lib/prisma'

export async function index() {
  return prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function count({
  data,
}: {
  data: {
    ipHash: string
    appName: string
    userAgent: string
    city: string
    state: string
    country: string
  }
}) {
  const res = await fetch(
    'https://worldtimeapi.org/api/timezone/America/Sao_Paulo',
  )
  const timeData = await res.json()

  return prisma.visit.create({
    data: {
      ...data,
      createdAt: timeData.datetime,
    },
  })
}
