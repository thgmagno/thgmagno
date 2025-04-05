import { ErrorMessage } from '@/components/common/ErrorMessage'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormationFormState } from '@/lib/states'
import { FormFooter } from './FormFooter'
import { Formation } from '@prisma/client'
import { Textarea } from '@/components/ui/textarea'
import { SelectCategory } from '../common/SelectCategory'
import { SelectInstitution } from '../common/SelectInstitution'
import { useState } from 'react'

export function FormationForm({
  action,
  formState,
  isPending,
  formation,
}: {
  action: (payload: FormData) => void
  formState: FormationFormState
  isPending: boolean
  formation?: Formation
}) {
  const [active, setActive] = useState<boolean>(Boolean(formation?.active))

  return (
    <form action={action}>
      <CardContent className="space-y-4">
        <input type="hidden" name="id" defaultValue={formation?.id || ''} />
        <input type="hidden" name="active" value={active ? 'on' : 'off'} />

        {/* Título */}
        <div className="flex flex-col space-y-1.5">
          <Label>Título</Label>
          <Input
            name="title"
            defaultValue={formation?.title || ''}
            placeholder="Informe o título"
          />
          <ErrorMessage message={formState?.errors.title} />
        </div>

        {/* URL Certificado */}
        <div className="flex flex-col space-y-1.5">
          <Label>Certificado</Label>
          <Textarea
            name="certificateUrl"
            placeholder="Informe a url do certificado"
            defaultValue={formation?.certificateUrl || ''}
          />
          <ErrorMessage message={formState?.errors.certificateUrl} />
        </div>

        {/* Categoria */}
        <div className="flex flex-col space-y-1.5">
          <Label>Categoria</Label>
          <SelectCategory selectedCategory={formation?.categoryId} />
          <ErrorMessage message={formState?.errors.categoryId} />
        </div>

        {/* Instituição */}
        <div className="flex flex-col space-y-1.5">
          <Label>Instituição</Label>
          <SelectInstitution selectedInstitution={formation?.institutionId} />
          <ErrorMessage message={formState?.errors.institutionId} />
        </div>

        {/* Início */}
        <div className="flex flex-col space-y-1.5">
          <Label>Início</Label>
          <input
            type="date"
            name="startedAt"
            defaultValue={
              formation?.startedAt?.toISOString().split('T')[0] || ''
            }
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600"
          />
          <ErrorMessage message={formState?.errors.startedAt} />
        </div>

        {/* Fim */}
        <div className="flex flex-col space-y-1.5">
          <Label>Fim</Label>
          <input
            type="date"
            name="endedAt"
            defaultValue={formation?.endedAt?.toISOString().split('T')[0] || ''}
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600"
          />
          <ErrorMessage message={formState?.errors.endedAt} />
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
      <FormFooter isPending={isPending} active={active} setActive={setActive} />
    </form>
  )
}
