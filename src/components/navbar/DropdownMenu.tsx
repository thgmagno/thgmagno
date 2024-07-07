'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { Dot, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ToggleTheme } from '../toggle-theme'
import { FlagBR, FlagUK } from '../flags'

export function DropdownMenuComponent() {
  const pathname = usePathname()

  const MenuItem = ({ href, label }: { href: string; label: string }) => {
    const isActive =
      (pathname === '/' && href === '/') ||
      (href !== '/' && pathname.includes(href))

    return (
      <Link href={href} className="m-1 flex">
        {isActive && <Dot />}
        <span className={`${isActive ? 'ml-0' : 'ml-2'}`}>{label}</span>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <button>
          <Menu size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5 w-44 border-none bg-slate-200 dark:bg-neutral-800">
        <DropdownMenuLabel>Navegar para:</DropdownMenuLabel>
        <hr className="my-1.5 border-neutral-400 dark:border-neutral-600" />
        <DropdownMenuGroup className="flex flex-col">
          <MenuItem href="/" label="Início" />
          <MenuItem href="/formacao" label="Formação" />
          <MenuItem href="/projetos" label="Projetos" />
          <MenuItem href="/blog" label="Blog" />
        </DropdownMenuGroup>
        <hr className="my-1.5 border-neutral-400 dark:border-neutral-600" />
        <div className="grid grid-cols-2 pr-2">
          <DropdownMenuLabel>Idioma:</DropdownMenuLabel>
          <DropdownMenuGroup className="flex flex-col gap-1 text-sm">
            <button className="flex items-center justify-end gap-2">
              PT <FlagBR />
            </button>
            <button className="flex items-center justify-end gap-2 opacity-40">
              EN <FlagUK />
            </button>
          </DropdownMenuGroup>
        </div>
        <hr className="my-1.5 border-neutral-400 dark:border-neutral-600" />
        <DropdownMenuLabel className="flex justify-between">
          Tema: <ToggleTheme />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
