'use client'

import { ThemeProvider, ThemeProviderProps } from 'next-themes'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import crypto from 'crypto'

interface ProvidersProps extends ThemeProviderProps {
  children: React.ReactNode
  ipInfoToken: string
  appToken: string
  appName: string
  appApiUrl: string
  isAdmin: boolean
}

export function Providers({
  children,
  ipInfoToken,
  appToken,
  appName,
  appApiUrl,
  isAdmin,
  ...props
}: ProvidersProps) {
  return (
    <AppProvider
      ipInfoToken={ipInfoToken}
      appToken={appToken}
      appName={appName}
      appApiUrl={appApiUrl}
      isAdmin={isAdmin}
    >
      <ThemeProvider {...props}>
        {children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </AppProvider>
  )
}

function AppProvider({
  children,
  ipInfoToken,
  appToken,
  appName,
  appApiUrl,
  isAdmin,
}: {
  children: React.ReactNode
  ipInfoToken: string
  appToken: string
  appName: string
  appApiUrl: string
  isAdmin: boolean
}) {
  useEffect(() => {
    const hasKey = sessionStorage.getItem('app-api-fetcher')

    if (!hasKey && !isAdmin) {
      const sendVisitData = async () => {
        const userAgent = navigator.userAgent
        const ipResponse = await fetch('https://api64.ipify.org?format=json')
        const { ip } = await ipResponse.json()

        const geoResponse = await fetch(
          `https://ipinfo.io/${ip}?token=${ipInfoToken}`,
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
          appToken,
          appName,
          userAgent,
          ipHash,
          city,
          state,
          country,
        })

        navigator.sendBeacon(appApiUrl, data)

        sessionStorage.setItem('app-api-fetcher', Date.now().toString())
      }

      sendVisitData()
    }
  }, [])

  return <>{children}</>
}
