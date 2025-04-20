import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export function FormFooter({
  isPending,
  active,
  setActive,
}: {
  isPending: boolean
  active?: boolean
  setActive?: (value: boolean) => void
}) {
  return (
    <CardFooter className="flex items-center">
      {setActive && (
        <div className="flex items-center space-x-2">
          <Checkbox defaultChecked={true} onClick={() => setActive(!active)} />
          <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Ativo
          </label>
        </div>
      )}
      <Button type="submit" disabled={isPending} className="ml-auto">
        {isPending ? 'Salvando...' : 'Salvar'}
      </Button>
    </CardFooter>
  )
}
