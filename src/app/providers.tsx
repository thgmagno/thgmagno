'use client'

import { ThemeProvider, ThemeProviderProps } from 'next-themes'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import crypto from 'crypto'
import { env } from 'root/env'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <AppProvider>
      <ThemeProvider {...props}>
        {children}
        <Toaster />
      </ThemeProvider>
    </AppProvider>
  )
}

function AppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const hasKey = sessionStorage.getItem('app-api-fetcher')

    if (!hasKey) {
      const sendVisitData = async () => {
        const userAgent = navigator.userAgent
        const ipResponse = await fetch('https://api64.ipify.org?format=json')
        const { ip } = await ipResponse.json()

        const geoResponse = await fetch(
          `https://ipinfo.io/${ip}?token=${env.IPINFO_TOKEN}`,
        )
        const geo = await geoResponse.json()

        const { city, region: state, country } = geo

        const now = new Date()
        const salt = now.toISOString().slice(0, 13)
        const fingerprint = ip + userAgent + salt
        const ipHash = crypto
          .createHash('sha256')
          .update(fingerprint)
          .digest('hex')

        const data = JSON.stringify({
          token: env.APP_API_TOKEN,
          app: env.APP_NAME,
          userAgent,
          ipHash,
          city,
          state,
          country,
        })

        navigator.sendBeacon(env.APP_API_URL, data)

        sessionStorage.setItem('app-api-fetcher', Date.now().toString())
      }

      sendVisitData()
    }
  }, [])

  return <>{children}</>
}
