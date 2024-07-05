import Image from 'next/image'
import Link from 'next/link'
import { DropdownMenuComponent } from './DropdownMenu'

export function Navbar() {
  return (
    <nav className="flex h-14 items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900 px-3 shadow-md md:h-16 md:px-6">
      <DropdownMenuComponent />
      <Link href="/" className="relative flex h-10 w-10 md:h-12 md:w-12">
        <Image
          src="/logo_thg.svg"
          alt="Logotipo THG"
          layout="fill"
          objectFit="cover"
          className="w-full object-cover"
        />
      </Link>
      <div className="relative flex h-8 w-8 cursor-pointer md:h-10 md:w-10">
        <Image
          src="/thiago.jpg"
          alt="Foto de Thiago magno"
          layout="fill"
          objectFit="cover"
          className="w-full rounded-full object-cover"
        />
      </div>
    </nav>
  )
}
