import { ErrorMessage } from '@/components/common/ErrorMessage'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormationFormState } from '@/lib/states'
import { FormFooter } from '@/components/form/FormFooter'
import { Formation } from '@prisma/client'
import { Textarea } from '@/components/ui/textarea'
import { SelectCategory } from '@/components/common/SelectCategory'
import { SelectInstitution } from '@/components/common/SelectInstitution'
import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'

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
  const [complementary, setComplementary] = useState<boolean>(
    Boolean(formation?.complementary),
  )

  return (
    <form action={action}>
      <CardContent className="space-y-4">
        <input type="hidden" name="id" defaultValue={formation?.id || ''} />
        <input type="hidden" name="active" value={active ? 'on' : 'off'} />
        <input
          type="hidden"
          name="complementary"
          value={complementary ? 'on' : 'off'}
        />

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
      <FormFooter
        isPending={isPending}
        options={
          <Options
            active={active}
            setActive={setActive}
            complementary={complementary}
            setComplementary={setComplementary}
          />
        }
      />
    </form>
  )
}

function Options({
  active = true,
  setActive,
  complementary = false,
  setComplementary = () => {},
}: {
  active: boolean
  setActive: (value: boolean) => void
  complementary?: boolean
  setComplementary?: (value: boolean) => void
}) {
  return (
    <div className="flex items-center space-x-2">
      {/* Define se a formação está ativa */}
      <div className="flex items-center space-x-2">
        <Checkbox defaultChecked={true} onClick={() => setActive(!active)} />
        <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Ativo
        </label>
      </div>

      {/* Define se a formação é um curso complementar */}
      <div className="flex items-center space-x-2">
        <Checkbox
          defaultChecked={true}
          onClick={() => setComplementary(!complementary)}
        />
        <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Complementar
        </label>
      </div>
    </div>
  )
}
