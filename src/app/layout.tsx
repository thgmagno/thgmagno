import type { Metadata } from 'next'
import { Geist, Geist_Mono as GeistMono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { env } from 'root/env'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Thiago Magno',
  description:
    'Portfólio virtual, apresentando uma visão geral dos projetos que desenvolvi, minhas habilidades técnicas e a experiências na área de tecnologia.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers
          attribute="class"
          defaultTheme="dark"
          ipInfoToken={env.IPINFO_TOKEN}
          appToken={env.APP_TOKEN}
          appName={env.APP_NAME}
          appApiUrl={env.APP_API_URL}
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}
