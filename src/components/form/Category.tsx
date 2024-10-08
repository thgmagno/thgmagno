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
import { useCategoryStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function CategoryForm() {
  const [formState, action] = useFormState(upsertCategory, { errors: {} })
  const { id, title, setTitle, onReset } = useCategoryStore()

  useEffect(() => {
    if (formState?.success) {
      const message = id
        ? 'Categoria atualizada com sucesso.'
        : 'Categoria cadastrada com sucesso.'
      onReset()
      toast.success(message)
      formState.success = false
    }
  }, [formState?.success])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Nova Categoria</CardTitle>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-baseline gap-4">
            <input type="hidden" name="id" value={id} />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                placeholder="Informe o título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <ErrorMessage message={formState?.errors.title} />
            </div>
          </div>
          <ErrorMessage
            message={formState?.errors._form}
            className="text-center"
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" onClick={onReset} variant="ghost">
            Resetar
          </Button>
          <SubmitButton title="Salvar" />
        </CardFooter>
      </form>
    </Card>
  )
}
