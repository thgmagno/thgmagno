import { ErrorMessage } from '@/components/common/ErrorMessage'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormationFormState } from '@/actions/formation'
import { Button } from '@/components/ui/button'

export function FormationForm({
  action,
  formState,
  isPending,
}: {
  action: (payload: FormData) => void
  formState: FormationFormState
  isPending: boolean
}) {
  return (
    <form action={action}>
      <CardContent>
        <div className="grid w-full items-baseline gap-4 md:grid-cols-2">
          <input type="hidden" name="id" />
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
      <CardFooter className="flex justify-end space-x-2">
        <Button type="button">Cancelar</Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Salvando...' : 'Salvar'}
        </Button>
      </CardFooter>
    </form>
  )
}
