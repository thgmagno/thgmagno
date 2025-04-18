import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) redirect('/login')
  if (!session.user?.isAdmin) redirect('/')

  return <main>{children}</main>
}
