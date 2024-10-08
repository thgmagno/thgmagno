'use client'

import { Loader, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <Loader className="h-5 w-5 animate-spin" />
  }

  if (resolvedTheme === 'dark') {
    return (
      <Sun
        onClick={() => setTheme('light')}
        className="h-5 w-5 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-200"
      />
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <Moon
        onClick={() => setTheme('dark')}
        className="h-5 w-5 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-200"
      />
    )
  }
}
