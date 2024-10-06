'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button>
      <Sun
        onClick={() => setTheme('light')}
        className={clsx(
          'h-5 w-5 hover:text-neutral-800 dark:hover:text-neutral-200',
          { hidden: theme === 'light' },
        )}
      />
      <Moon
        onClick={() => setTheme('dark')}
        className={clsx(
          'h-5 w-5 hover:text-neutral-800 dark:hover:text-neutral-200',
          { hidden: !theme || theme === 'dark' },
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
