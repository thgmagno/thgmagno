'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ToggleTheme } from '@/components/toggle-theme'
import { SelectLanguage } from '@/components/select-language'
import { useLanguageStore } from '@/lib/store/languageStore'

export function MenuComponent() {
  const pathname = usePathname()
  const { language } = useLanguageStore()

  const MenuItem = ({ href, label }: { href: string; label: string }) => {
    const isActive =
      (pathname === '/' && href === '/') ||
      (href !== '/' && pathname.includes(href))

    return (
      <Link href={href} className={isActive ? 'underline' : ''}>
        {label}
      </Link>
    )
  }

  const dicts = {
    label: {
      portuguese: ['Início', 'Formação', 'Projetos', 'Blog'],
      english: ['Home', 'Education', 'Projects', 'Blog'],
    },
  }

  return (
    <nav className="ml-20 hidden flex-1 items-center md:flex md:justify-between">
      <ul className="flex space-x-6">
        <MenuItem href="/" label={dicts.label[language][0]} />
        <MenuItem href="/formacao" label={dicts.label[language][1]} />
        <MenuItem href="/projetos" label={dicts.label[language][2]} />
        <MenuItem href="/blog" label={dicts.label[language][3]} />
      </ul>
      <div className="flex items-center gap-5">
        <ToggleTheme />
        <SelectLanguage />
      </div>
    </nav>
  )
}
