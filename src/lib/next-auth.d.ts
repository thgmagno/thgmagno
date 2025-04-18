// types/auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      isAdmin?: boolean
    }
  }

  interface User {
    isAdmin?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
