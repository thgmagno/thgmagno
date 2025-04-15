import Link from 'next/link'
import { auth } from '@/auth'
import { Github, Linkedin, Mail, MonitorCog } from 'lucide-react'

export async function Footer() {
  const currentYear = new Date().getFullYear()
  const session = await auth()

  return (
    <small className="mt-16 block cursor-default text-[#1C1C1C] lg:mt-24 dark:text-[#D4D4D4]">
      <time>© {currentYear} - Thiago Magno</time>
      <div className="float-right flex gap-3.5 text-lg transition-opacity duration-300 hover:opacity-90">
        <Link href="https://github.com/thgmagno" target="_blank">
          <Github size="18" />
        </Link>
        <Link href="https://www.linkedin.com/in/thgmagno" target="_blank">
          <Linkedin size="18" />
        </Link>
        <Link href="mailto:thgmgn@gmail.com">
          <Mail size="18" />
        </Link>
        {session && (
          <Link href="/admin">
            <MonitorCog size="18" />
          </Link>
        )}
      </div>
    </small>
  )
}
