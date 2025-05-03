'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function RedisDeleteKeyButton({ redisKey }: { redisKey: string }) {
  const deleteEntry = () =>
    toast.promise(actions.redis.deleteEntry(redisKey), {
      loading: 'Aguarde...',
      error: 'Falha ao excluir a chave',
      success: 'Chave excluída com sucesso',
    })

  return (
    <Button variant="secondary" size="sm" onClick={deleteEntry}>
      Excluir
    </Button>
  )
}
