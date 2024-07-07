'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon, Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ToggleTheme() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <Loader2 size={24} className="animate-spin" />

  if (resolvedTheme === 'dark') {
    return (
      <Sun
        onClick={() => setTheme('light')}
        size={24}
        className="cursor-pointer"
      />
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <Moon
        onClick={() => setTheme('dark')}
        size={24}
        className="cursor-pointer"
      />
    )
  }
}
