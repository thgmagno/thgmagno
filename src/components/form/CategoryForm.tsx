'use client'

import { CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { CategoryFormState } from '@/lib/states'
import { Category } from '@prisma/client'
import { FormFooter } from '@/components/form/FormFooter'
import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'

export function CategoryForm({
  action,
  formState,
  isPending,
  category,
}: {
  action: (payload: FormData) => void
  formState: CategoryFormState
  isPending: boolean
  category?: Category
}) {
  const [active, setActive] = useState<boolean>(Boolean(category?.active))

  return (
    <form action={action}>
      <CardContent>
        <div className="grid w-full items-baseline gap-4">
          <input type="hidden" name="id" defaultValue={category?.id || ''} />
          <input type="hidden" name="active" value={active ? 'on' : 'off'} />

          {/* Título */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              placeholder="Informe o título"
              defaultValue={category?.title || ''}
            />
            <ErrorMessage message={formState?.errors.title} />
          </div>

          {/* Slug */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Slug</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="Informe o título"
              defaultValue={category?.slug || ''}
            />
            <ErrorMessage message={formState?.errors.slug} />
          </div>
        </div>
        <div className="mt-3 flex">
          <ErrorMessage
            message={formState?.errors.id}
            className="text-center"
          />
          <ErrorMessage
            message={formState?.errors._form}
            className="text-center"
          />
        </div>
      </CardContent>
      <FormFooter
        isPending={isPending}
        options={
          <div className="flex items-center space-x-2">
            {/* Define se a categoria está ativa */}
            <div className="flex items-center space-x-2">
              <Checkbox
                defaultChecked={true}
                onClick={() => setActive(!active)}
              />
              <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ativo
              </label>
            </div>
          </div>
        }
      />
    </form>
  )
}
