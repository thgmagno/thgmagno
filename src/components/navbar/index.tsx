import Image from 'next/image'
import Link from 'next/link'
import { DropdownMenuComponent } from '@/components/navbar/DropdownMenu'
import { MenuComponent } from '@/components/navbar/Menu'

export function Navbar() {
  return (
    <nav className="flex h-14 items-center bg-slate-900 shadow-md dark:bg-neutral-950/80 md:h-16">
      <div className="relative mx-auto flex w-[90%] max-w-6xl items-center justify-between md:justify-normal md:gap-10">
        <Link href="/" className="relative flex h-8 w-8 md:h-10 md:w-10">
          <Image
            src="/logo_thg.svg"
            alt="Logotipo THG"
            layout="fill"
            objectFit="cover"
            className="w-full object-cover"
          />
        </Link>
        <MenuComponent />
        <DropdownMenuComponent />
      </div>
    </nav>
  )
}
