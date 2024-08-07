import Link from 'next/link'
import { Bangers } from 'next/font/google'

const bangers = Bangers({ subsets: ['latin'], weight: ['400'] })

export function Logo() {
  return (
    <Link href="/">
      <span
        className={`absolute -top-1 text-3xl tracking-tight text-zinc-600 duration-300 dark:text-zinc-300 md:hover:tracking-wide ${bangers.className}`}
      >
        THG
      </span>
    </Link>
  )
}
