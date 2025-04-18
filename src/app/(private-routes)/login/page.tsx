'use client'

import { Button } from '@/components/ui/button'
import { Github, HomeIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const handleSignIn = async () => await signIn('github')
  const { replace } = useRouter()

  return (
    <section className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
      <span className="text-sm font-light text-amber-400">
        Somente usuários autorizados
      </span>
      <Button
        onClick={handleSignIn}
        className="flex w-full items-center justify-center gap-2.5 p-6 text-lg"
      >
        <Github />
        Entrar com GitHub
      </Button>
      <Button
        onClick={() => replace('/')}
        className="flex w-full items-center justify-center gap-2.5 p-6 text-lg"
        variant="outline"
      >
        <HomeIcon />
        Página inicial
      </Button>
    </section>
  )
}
