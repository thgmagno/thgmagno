import Image from 'next/image'
import Link from 'next/link'
import { DropdownMenuComponent } from './DropdownMenu'

export function Navbar() {
  return (
    <nav className="flex h-14 items-center bg-slate-900 shadow-md dark:bg-neutral-950/80 md:h-16">
      <div className="mx-auto flex max-w-[96%] flex-1 items-center gap-5">
        <Link href="/" className="relative flex h-8 w-8 md:h-10 md:w-10">
          <Image
            src="/logo_thg.svg"
            alt="Logotipo THG"
            layout="fill"
            objectFit="cover"
            className="w-full object-cover"
          />
        </Link>
        <DropdownMenuComponent />
      </div>
    </nav>
  )
}
