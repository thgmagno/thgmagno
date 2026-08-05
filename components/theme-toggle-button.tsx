"use client"

import { useTheme } from 'next-themes'
import { Loader2 } from 'lucide-react'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => { }

export function ThemeToggleButton() {
    const { resolvedTheme, setTheme } = useTheme()

    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
      )
    
      if (!mounted) {
        return (
            <Loader2 className="animate-spin duration-300 opacity-80" size={18} />
        )
    }

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            data-slot="button"
            data-variant="ghost"
            data-size="icon"
            aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 group/toggle extend-touch-target size-8"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4.5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M12 3l0 18"></path>
                <path d="M12 9l4.65 -4.65"></path>
                <path d="M12 14.3l7.37 -7.37"></path>
                <path d="M12 19.6l8.85 -8.85"></path>
            </svg>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}