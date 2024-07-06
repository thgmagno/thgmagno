'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ToggleTheme } from '../toggle-theme'

export function MenuComponent() {
  const pathname = usePathname()

  const MenuItem = ({ href, label }: { href: string; label: string }) => {
    const isActive =
      (pathname === '/' && href === '/') ||
      (href !== '/' && pathname.includes(href))

    return (
      <Link
        href={href}
        className={`text-neutral-100 ${isActive ? 'underline' : ''}`}
      >
        {label}
      </Link>
    )
  }

  return (
    <nav className="hidden flex-1 items-center md:flex md:justify-between">
      <ul className="flex space-x-6">
        <MenuItem href="/" label="Início" />
        <MenuItem href="/formacao" label="Formação" />
        <MenuItem href="/projetos" label="Projetos" />
        <MenuItem href="/blog" label="Blog" />
      </ul>
      <ToggleTheme light />
    </nav>
  )
}
