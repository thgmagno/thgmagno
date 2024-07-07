import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { FlagBR, FlagUK } from '@/components/flags'

export function SelectLanguage() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <FlagBR />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5 w-44 border-none bg-slate-200 dark:bg-neutral-800">
        <DropdownMenuLabel>Selecionar idioma:</DropdownMenuLabel>
        <hr className="my-1.5 border-neutral-400 dark:border-neutral-600" />
        <DropdownMenuGroup className="flex flex-col gap-1 px-2 text-sm">
          <button className="flex items-center gap-2">
            <FlagBR /> Português
          </button>
          <button className="flex items-center gap-2 opacity-40">
            <FlagUK /> Inglês
          </button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
