import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  function validarString(valor: unknown): string | undefined {
    if (typeof valor !== 'string') return undefined
    const str = valor.trim()
    return str.length > 0 && str.length <= 30 ? str : undefined
  }

  try {
    const body = await req.json()

    const { token, appName, userAgent, ipHash, city, state, country } = body

    if (
      typeof token !== 'string' ||
      typeof appName !== 'string' ||
      typeof ipHash !== 'string'
    ) {
      return new NextResponse(null, { status: 403 })
    }

    const isValidToken = token === process.env.APP_API_TOKEN
    if (!isValidToken) {
      return new NextResponse(null, { status: 403 })
    }

    await prisma.visit.create({
      data: {
        ipHash,
        appName,
        userAgent: validarString(userAgent),
        city: validarString(city),
        state: validarString(state),
        country: validarString(country),
      },
    })

    return new NextResponse(null, { status: 200 })
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
