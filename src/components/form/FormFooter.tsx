import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function FormFooter({ isPending }: { isPending: boolean }) {
  return (
    <CardFooter className="flex justify-end">
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Salvando...' : 'Salvar'}
      </Button>
    </CardFooter>
  )
}
