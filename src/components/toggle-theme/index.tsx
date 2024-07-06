'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon, Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'

interface Props {
  light?: boolean
}

export function ToggleTheme({ light }: Props) {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return <Loader2 size={20} className="animate-spin text-neutral-100" />

  if (resolvedTheme === 'dark') {
    return (
      <Sun
        onClick={() => setTheme('light')}
        size={20}
        className={`cursor-pointer ${light ? 'text-neutral-100' : ''}`}
      />
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <Moon
        onClick={() => setTheme('dark')}
        size={20}
        className={`cursor-pointer ${light ? 'text-neutral-100' : ''}`}
      />
    )
  }
}
