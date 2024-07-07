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
import { useLanguageStore, ValidLanguage } from '@/lib/store/languageStore'
import { toast } from 'sonner'

type DictType = {
  menuOptions: {
    value: ValidLanguage
    label: string
  }[]
  icon: {
    portuguese: JSX.Element
    english: JSX.Element
  }
}

export function DropdownMenuComponent() {
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
        <ManuNavigation />
        <hr className="my-1.5 border-neutral-400 dark:border-neutral-600" />
        <SelectLanguage />
        <hr className="my-1.5 border-neutral-400 dark:border-neutral-600" />
        <SelectTheme />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ManuNavigation() {
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
    <DropdownMenuGroup className="flex flex-col">
      <MenuItem href="/" label="Início" />
      <MenuItem href="/formacao" label="Formação" />
      <MenuItem href="/projetos" label="Projetos" />
      <MenuItem href="/blog" label="Blog" />
    </DropdownMenuGroup>
  )
}

function SelectLanguage() {
  const { setLanguage, language } = useLanguageStore()

  function handleChangeLanguage(newLanguage: string) {
    const acceptLanguages = ['portuguese', 'english']

    if (language === newLanguage || !acceptLanguages.includes(newLanguage))
      return null

    switch (newLanguage) {
      case 'portuguese':
        toast(
          <div className="flex gap-3 font-semibold">
            <FlagBR /> Idioma alterado para Português
          </div>,
        )
        setLanguage(newLanguage)
        break
      case 'english':
        toast(
          <div className="flex gap-3 font-semibold">
            <FlagUK /> Language changed to English
          </div>,
        )
        setLanguage(newLanguage)
        break
      default:
        toast.error('Opção inválida')
        setLanguage('portuguese')
        break
    }
  }

  const dicts: DictType = {
    menuOptions: [
      { value: 'portuguese', label: 'PT' },
      { value: 'english', label: 'EN' },
    ],
    icon: {
      portuguese: <FlagBR />,
      english: <FlagUK />,
    },
  }

  return (
    <div className="grid grid-cols-2 pr-2">
      <DropdownMenuLabel>Idioma:</DropdownMenuLabel>
      <DropdownMenuGroup className="flex flex-col gap-1 text-sm">
        {dicts.menuOptions.map((option) => (
          <button
            onClick={() => handleChangeLanguage(option.value)}
            className={`flex items-center justify-end gap-2 ${language === option.value ? '' : 'opacity-30'}`}
          >
            {option.label} {dicts.icon[option.value]}
          </button>
        ))}
      </DropdownMenuGroup>
    </div>
  )
}

function SelectTheme() {
  return (
    <DropdownMenuLabel className="flex justify-between">
      Tema: <ToggleTheme />
    </DropdownMenuLabel>
  )
}
