'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { FlagBR, FlagUK } from '@/components/flags'
import { toast } from 'sonner'
import { useLanguageStore, ValidLanguage } from '@/lib/store/languageStore'

type DictType = {
  menuLabel: {
    portuguese: string
    english: string
  }
  menuOptions: {
    portuguese: {
      value: ValidLanguage
      label: string
    }[]
    english: {
      value: ValidLanguage
      label: string
    }[]
  }
  icon: {
    portuguese: JSX.Element
    english: JSX.Element
  }
}

export function SelectLanguage() {
  const { language, setLanguage, Icon } = useLanguageStore()

  function handleChangeLanguage(newLanguage: 'portuguese' | 'english') {
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
        setLanguage(language)
        break
      case 'english':
        toast(
          <div className="flex gap-3 font-semibold">
            <FlagUK /> Language changed to English
          </div>,
        )
        setLanguage(language)
        break
      default:
        toast.error('Opção inválida')
        setLanguage('portuguese')
        break
    }
  }

  const dicts: DictType = {
    menuLabel: {
      portuguese: 'Idioma',
      english: 'Language',
    },
    menuOptions: {
      portuguese: [
        { value: 'portuguese', label: 'Português' },
        { value: 'english', label: 'Inglês' },
      ],
      english: [
        { value: 'portuguese', label: 'Portuguese' },
        { value: 'english', label: 'English' },
      ],
    },
    icon: {
      portuguese: <FlagBR />,
      english: <FlagUK />,
    },
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{Icon}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5 w-44 border-none bg-slate-200 dark:bg-neutral-800">
        <DropdownMenuLabel>{dicts.menuLabel[language]}:</DropdownMenuLabel>
        <hr className="my-1.5 border-neutral-400 dark:border-neutral-600" />
        <DropdownMenuGroup className="flex flex-col gap-1 px-2 text-sm">
          {dicts.menuOptions[language].map((option) => (
            <button
              key={option.value}
              onClick={() => handleChangeLanguage(option.value)}
              className={`flex items-center gap-2 ${language === option.value ? '' : 'opacity-30'}`}
            >
              {dicts.icon[option.value]} {option.label}
            </button>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
