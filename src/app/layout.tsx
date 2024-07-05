import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thiago Magno',
  description: 'Conheça meu portfólio online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={lexend.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
