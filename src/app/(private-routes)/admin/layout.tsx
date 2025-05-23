import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session?.user?.isAdmin) redirect('/login')

  return <main>{children}</main>
}
