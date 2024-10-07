'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { SubmitButton } from '@/components/common/SubmitButton'
import { upsertCategory } from '@/server/services'

export function CategoryForm() {
  const [formState, action] = useFormState(upsertCategory, { errors: {} })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Nova Categoria</CardTitle>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-baseline gap-4">
            <input type="hidden" name="id" value="" />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" placeholder="Informe o título" />
              <ErrorMessage message={formState?.errors.title} />
            </div>
          </div>
          <ErrorMessage
            message={formState?.errors._form}
            className="text-center"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton title="Cadastrar" />
        </CardFooter>
      </form>
    </Card>
  )
}
