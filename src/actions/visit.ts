'use server'

import { prisma } from '@/lib/prisma'

export async function index() {
  return prisma.visit.findMany({
    orderBy: { visitDate: 'desc' },
  })
}

export async function check() {}

export async function count() {}
