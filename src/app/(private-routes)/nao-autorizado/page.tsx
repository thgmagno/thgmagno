import { buttonVariants } from '@/components/ui/button'
import { ShieldBan } from 'lucide-react'
import Link from 'next/link'

export default function NotAuthorized() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-[90%] max-w-md flex-col rounded-xl bg-neutral-900 p-6">
        <div className="flex items-center">
          <ShieldBan size={40} className="mr-3 text-amber-400" />
          <div>
            <h1 className="text-xl font-medium">Acesso negado</h1>
            <p className="text-neutral-300">
              Você não tem permissão para fazer o login.
            </p>
          </div>
        </div>
        <Link
          href="/"
          className={`mt-5 cursor-pointer ${buttonVariants({ variant: 'secondary' })}`}
        >
          Voltar a Página inicial
        </Link>
      </div>
    </div>
  )
}
