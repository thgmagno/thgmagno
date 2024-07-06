'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ToggleTheme() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (resolvedTheme === 'dark') {
    return (
      <Sun
        onClick={() => setTheme('light')}
        size={20}
        className="cursor-pointer"
      />
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <Moon
        onClick={() => setTheme('dark')}
        size={20}
        className="cursor-pointer"
      />
    )
  }
}
