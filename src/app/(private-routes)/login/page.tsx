'use client'

import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const handleSignIn = async () => await signIn('github')

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <Button
        onClick={handleSignIn}
        className="flex items-center justify-center gap-2.5 p-6 text-lg"
      >
        <Github />
        Entrar com GitHub
      </Button>
    </section>
  )
}
