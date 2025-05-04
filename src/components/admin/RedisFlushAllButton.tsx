'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

export function RedisFlushAllButton() {
  const [formState, action, isPending] = useActionState(
    actions.redis.flushAll,
    {},
  )

  useEffect(() => {
    if (formState?.status === 'sucesso') toast.success(formState.message)
    if (formState?.status === 'erro') toast.error(formState.message)
  }, [formState])

  return (
    <form action={action}>
      <Button variant="secondary" size="sm">
        {isPending ? 'Aguarde...' : 'FlushAll'}
      </Button>
    </form>
  )
}
