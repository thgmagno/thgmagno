'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CategoryForm } from '../form/CategoryForm'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { Button } from '@/components/ui/button'

export function CategoryAdd() {
  const [formState, action, isPending] = useActionState(
    actions.category.create,
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
          <DialogTitle>Adicionar categoria</DialogTitle>
        </DialogHeader>
        <CategoryForm
          formState={formState}
          action={action}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
