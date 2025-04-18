import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { env } from 'root/env'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account }) {
      const callbackUrl = String(account?.callbackUrl || '')
      const isAdminPage = callbackUrl.includes('/admin')

      if (isAdminPage && user.email !== env.ADMIN_EMAIL) {
        return '/nao-autorizado'
      }

      return true
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as unknown as string
      session.user.isAdmin = session.user.email === env.ADMIN_EMAIL
      return session
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        return '/admin'
      }
      return url
    },
  },
})
