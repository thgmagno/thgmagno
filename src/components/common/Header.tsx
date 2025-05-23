import Link from 'next/link'
import { ModeToggle } from '@/components/common/ModeToggle'

export function Header() {
  return (
    <nav className="mb-12 flex flex-col py-4 md:flex-row lg:mb-16">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <Link href="/" className="text-[28px] font-semibold tracking-tight">
          Thiago Magno
        </Link>
      </div>
      <div className="mt-6 flex flex-row items-center gap-4 md:mt-0 md:ml-auto">
        <Item href="/formacao" label="Formação" />
        <Item href="/projetos" label="Projetos" />
        <ModeToggle />
      </div>
    </nav>
  )
}

function Item({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative flex align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
    >
      {label}
    </Link>
  )
}
