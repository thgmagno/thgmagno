import Link from 'next/link'
import { auth } from '@/auth'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Github, Linkedin, Mail, MonitorCog } from 'lucide-react'

export async function Footer() {
  const currentYear = new Date().getFullYear()
  const session = await auth()

  return (
    <small className="mt-16 block cursor-default text-[#1C1C1C] lg:mt-24 dark:text-[#D4D4D4]">
      <time>© {currentYear} - Thiago Magno</time>
      <div className="float-right flex gap-3.5 text-lg transition-opacity duration-300 hover:opacity-90">
        <Link href="https://github.com/thgmagno" target="_blank">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Github size="18" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Github</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        <Link href="https://www.linkedin.com/in/thgmagno" target="_blank">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Linkedin size="18" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Linkedin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        <Link href="mailto:thgmgn@gmail.com">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Mail size="18" />
              </TooltipTrigger>
              <TooltipContent>
                <p>E-mail</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        {session?.user.isAdmin && (
          <Link href="/admin">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MonitorCog size="18" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Painel admin</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        )}
      </div>
    </small>
  )
}
