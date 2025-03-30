import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { env } from 'root/env'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      if (user.email !== env.ADMIN_EMAIL) {
        return '/nao-autorizado'
      }
      return true
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
})
