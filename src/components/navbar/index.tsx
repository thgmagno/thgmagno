import { DropdownMenuComponent } from '@/components/navbar/DropdownMenu'
import { MenuComponent } from '@/components/navbar/Menu'
import { Logo } from '@/components/logo'

export function Navbar() {
  return (
    <nav className="flex h-14 items-center bg-slate-300 dark:bg-[#0F0F0F] md:h-16">
      <div className="relative mx-auto flex w-[90%] max-w-6xl items-center justify-between md:justify-normal">
        <Logo />
        <MenuComponent />
        <DropdownMenuComponent />
      </div>
    </nav>
  )
}
