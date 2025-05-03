'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { InstitutionForm } from '@/components/form/InstitutionForm'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { Button } from '@/components/ui/button'

export function InstitutionAdd() {
  const [formState, action, isPending] = useActionState(
    actions.institution.create,
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
          <DialogTitle>Adicionar instituição</DialogTitle>
        </DialogHeader>
        <InstitutionForm
          formState={formState}
          action={action}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
