import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InstitutionFormState } from '@/lib/states'
import { Institution } from '@prisma/client'
import { CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { FormFooter } from './FormFooter'
import { SelectLocation } from '../common/SelectLocation'

export function InstitutionForm({
  action,
  formState,
  isPending,
  institution,
}: {
  action: (payload: FormData) => void
  formState: InstitutionFormState
  isPending: boolean
  institution?: Institution
}) {
  return (
    <form action={action}>
      <CardContent className="space-y-4">
        <input type="hidden" name="id" defaultValue={institution?.id || ''} />

        {/* Título */}
        <div className="flex flex-col space-y-1.5">
          <Label>Título</Label>
          <Input
            name="name"
            defaultValue={institution?.name || ''}
            placeholder="Informe o título"
          />
          <ErrorMessage message={formState?.errors.name} />
        </div>

        {/* Modalidade */}
        <div className="flex flex-col space-y-1.5">
          <Label>Modalidade</Label>
          <Select name="modality" defaultValue={institution?.modality}>
            <SelectTrigger>
              <SelectValue placeholder="Modalidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Modalidades</SelectLabel>
                <SelectItem value="ONLINE">Online</SelectItem>
                <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                <SelectItem value="HIBRIDO">Hibrido</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <ErrorMessage message={formState?.errors.modality} />
        </div>

        {/* Localização */}
        <div className="flex flex-col space-y-1.5">
          <Label>Localização</Label>
          <SelectLocation selectedLocation={institution?.locationId} />
          <ErrorMessage message={formState?.errors.locationId} />
        </div>
      </CardContent>
      <FormFooter isPending={isPending} />
    </form>
  )
}
