import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

export function FormFooter({
  isPending,
  options,
}: {
  isPending: boolean
  options?: ReactNode
}) {
  return (
    <CardFooter className="flex items-center">
      {options && <>{options}</>}
      <Button type="submit" disabled={isPending} className="ml-auto">
        {isPending ? 'Salvando...' : 'Salvar'}
      </Button>
    </CardFooter>
  )
}
