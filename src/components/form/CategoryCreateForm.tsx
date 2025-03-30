'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { CategoryForm } from './CategoryForm'

export function CategoryCreateForm() {
  const [formState, action, isPending] = useActionState(
    actions.category.create,
    { errors: {} },
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Nova Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryForm
          formState={formState}
          action={action}
          isPending={isPending}
        />
      </CardContent>
    </Card>
  )
}
