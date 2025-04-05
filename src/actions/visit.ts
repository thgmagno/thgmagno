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
  return prisma.visit.create({ data })
}
