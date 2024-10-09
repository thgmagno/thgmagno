'use client'

import { countVisitors } from '@/server/visitors'
import { ThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

export function Providers({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    const count = async (visitorId: string) => {
      try {
        await countVisitors(visitorId)
      } catch (error) {
        console.error('Erro ao contar visitantes:', error)
      }
    }

    const sessionVisitorId = sessionStorage.getItem('session_visitor_id')

    if (!sessionVisitorId && process.env.NODE_ENV === 'production') {
      const newSessionId = crypto.randomUUID()
      sessionStorage.setItem('session_visitor_id', newSessionId)
      count(newSessionId)
    }
  }, [])

  return (
    <ThemeProvider {...props}>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
