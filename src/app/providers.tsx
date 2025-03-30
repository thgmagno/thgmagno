'use client'

import { ThemeProvider, ThemeProviderProps } from 'next-themes'
import { Toaster } from 'sonner'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
