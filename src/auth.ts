import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { env } from 'root/env'

async function getVerifiedEmail(token?: string) {
  const res = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json',
    },
  })

  const emails = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const verifiedEmail = emails.find((e: any) => e.verified && e.primary)
  return verifiedEmail?.email
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token

        const email = await getVerifiedEmail(account.access_token)
        token.email = email
        token.isAdmin = email === env.ADMIN_EMAIL
      }

      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user.email = token.email as string
      session.user.isAdmin = token.isAdmin as boolean
      return session
    },
  },
})
