'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LocationForm } from '../form/LocationForm'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { Button } from '@/components/ui/button'

export function LocationAdd() {
  const [formState, action, isPending] = useActionState(
    actions.location.create,
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
          <DialogTitle>Adicionar localização</DialogTitle>
        </DialogHeader>
        <LocationForm
          formState={formState}
          action={action}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
