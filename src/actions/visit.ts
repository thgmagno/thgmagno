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

export async function getCountryName(code: string | null) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) return code
    const data = await res.json()
    return (
      String(data[0]?.translations?.por?.common) ||
      String(data[0]?.name?.common) ||
      code
    )
  } catch {
    return code
  }
}
