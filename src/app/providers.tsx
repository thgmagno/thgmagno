'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Toaster } from 'sonner'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
