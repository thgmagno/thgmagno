import { ErrorMessage } from '@/components/common/ErrorMessage'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormationFormState } from '@/lib/states'
import { FormFooter } from './FormFooter'
import { Formation } from '@prisma/client'
import { Checkbox } from '../ui/checkbox'
import { SelectCategory } from '../common/SelectCategory'
import { SelectInstitution } from '../common/SelectInstitution'

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
  return (
    <form action={action}>
      <CardContent>
        <input type="hidden" name="id" defaultValue={formation?.id || ''} />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            defaultValue={formation?.title || ''}
            placeholder="Informe o título"
          />
          <ErrorMessage message={formState?.errors.title} />
        </div>
        {/* {formation?.startedAt}
        {formation?.endedAt} */}
        <div className="flex flex-col space-y-1.5">
          <input
            type="hidden"
            name="certificateUrl"
            defaultValue={formation?.certificateUrl || ''}
          />
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="certificateUrl">Certificado</Label>
            <Input
              id="certificateUrl"
              name="certificateUrl"
              defaultValue={formation?.certificateUrl || ''}
              placeholder="Informe a url do certificado"
            />
            <ErrorMessage message={formState?.errors.certificateUrl} />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="category">Categoria</Label>
          <SelectCategory selectedCategory={formation?.categoryId} />
          <ErrorMessage message={formState?.errors.categoryId} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="institution">Instituição</Label>
          <SelectInstitution selectedInstitution={formation?.institutionId} />
          <ErrorMessage message={formState?.errors.institutionId} />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox name="active" defaultChecked={Boolean(formation?.active)} />
          <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Ativo
          </label>
          <ErrorMessage message={formState?.errors.active} />
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
      <FormFooter isPending={isPending} />
    </form>
  )
}
