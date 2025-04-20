'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { Button } from '@/components/ui/button'
import { CategoryProjectForm } from '../form/CategoryProjectForm'

export function CategoryProjectAdd() {
  const [formState, action, isPending] = useActionState(
    actions.repository.upsertCategoryProject,
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
        <CategoryProjectForm
          formState={formState}
          action={action}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
