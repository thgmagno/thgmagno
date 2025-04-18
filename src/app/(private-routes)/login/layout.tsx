import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (session?.user?.isAdmin) redirect('/admin')

  return <main>{children}</main>
}
