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
      <DropdownMenuTrigger asChild>
        <button>
          <Menu size={20} className="text-slate-100" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-2.5 w-44 border-slate-600 bg-slate-800 text-slate-100">
        <DropdownMenuLabel>Navegar para:</DropdownMenuLabel>
        <hr className="opacity-45" />
        <DropdownMenuGroup className="flex flex-col">
          <MenuItem href="/" label="Tela inicial" />
          <MenuItem href="/formacao" label="Formação" />
          <MenuItem href="/projetos" label="Projetos" />
          <MenuItem href="/blog" label="Blog" />
        </DropdownMenuGroup>
        <hr className="opacity-45" />
        <DropdownMenuGroup className="flex flex-col">
          <span className="my-2 flex items-center justify-between px-2">
            Tema: <ToggleTheme />
          </span>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
