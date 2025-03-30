'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { FormationForm } from './FormationForm'

export function CreateFormationForm() {
  const [formState, action, isPending] = useActionState(
    actions.formation.create,
    { errors: {} },
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Nova Formação</CardTitle>
      </CardHeader>
      <CardContent>
        <FormationForm
          formState={formState}
          action={action}
          isPending={isPending}
        />
      </CardContent>
    </Card>
  )
}
