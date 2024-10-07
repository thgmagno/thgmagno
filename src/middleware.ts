/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const privateRoutes = ['/admin']
  const token = cookies().get(process.env.COOKIE_NAME!)?.value
  const pathname = request.nextUrl.pathname

  if (privateRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const { exp } = (await jose.jwtVerify(token, secret)).payload
      if (exp && exp * 1000 < new Date().getTime()) {
        return NextResponse.redirect(new URL('/', request.url))
      }
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!static|_next/static|_next/image|favicon.ico).*)',
}
