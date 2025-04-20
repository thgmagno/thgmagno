'use client'

import { CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { CategoryProjectFormState } from '@/lib/states'
import { CategoryProject } from '@prisma/client'
import { FormFooter } from './FormFooter'

export function CategoryProjectForm({
  action,
  formState,
  isPending,
  category,
}: {
  action: (payload: FormData) => void
  formState: CategoryProjectFormState
  isPending: boolean
  category?: CategoryProject
}) {
  return (
    <form action={action}>
      <CardContent>
        <div className="grid w-full items-baseline gap-4">
          {/* Value */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="value">Valor</Label>
            <Input
              id="value"
              name="value"
              placeholder="Informe o valor"
              defaultValue={category?.value || ''}
            />
            <ErrorMessage message={formState?.errors.value} />
          </div>

          {/* Label */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="label">Título</Label>
            <Input
              id="label"
              name="label"
              placeholder="Informe o título"
              defaultValue={category?.label || ''}
            />
            <ErrorMessage message={formState?.errors.label} />
          </div>
        </div>
        <div className="mt-3 flex">
          <ErrorMessage
            message={formState?.errors._form}
            className="text-center"
          />
        </div>
      </CardContent>
      <FormFooter isPending={isPending} />
    </form>
  )
}
