'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default function LoginPage() {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <form action={actions.session.signInWithGithub}>
        <Button
          type="submit"
          className="flex items-center justify-center gap-2.5 p-6 text-lg"
        >
          <Github />
          Entrar com GitHub
        </Button>
      </form>
    </section>
  )
}
