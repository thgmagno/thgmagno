'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormationForm } from '@/components/form/FormationForm'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { Button } from '@/components/ui/button'

export function FormationAdd() {
  const [formState, action, isPending] = useActionState(
    actions.formation.create,
    { errors: {} },
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar formação</DialogTitle>
        </DialogHeader>
        <FormationForm
          formState={formState}
          action={action}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
