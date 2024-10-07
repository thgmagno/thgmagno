import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  )
}
