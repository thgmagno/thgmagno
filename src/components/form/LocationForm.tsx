import { LocationFormState } from '@/lib/states'
import { Location } from '@prisma/client'
import { CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { FormFooter } from '@/components/form/FormFooter'

export function LocationForm({
  action,
  formState,
  isPending,
  location,
}: {
  action: (payload: FormData) => void
  formState: LocationFormState
  isPending: boolean
  location?: Location
}) {
  return (
    <form action={action}>
      <CardContent className="space-y-4">
        <input type="hidden" name="id" defaultValue={location?.id || ''} />

        {/* Título */}
        <div className="flex flex-col space-y-1.5">
          <Label>Título</Label>
          <Input
            name="title"
            defaultValue={location?.title || ''}
            placeholder="Informe o título"
          />
          <ErrorMessage message={formState?.errors.title} />
        </div>
      </CardContent>
      <FormFooter isPending={isPending} />
    </form>
  )
}
