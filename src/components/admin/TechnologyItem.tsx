'use client'

import { Technology } from '@/lib/types'
import { deleteTechnology } from '@/server/services'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function TechnologyItem({ technology }: { technology: Technology }) {
  const onDelete = () => {
    toast.promise(deleteTechnology(technology.id as number), {
      loading: 'Processando...',
      success: 'Tecnologia deletada com sucesso.',
      error: 'Falha ao deletar a tecnologia.',
    })
  }

  return (
    <li className="flex items-center justify-between rounded-md border p-1.5 py-1">
      <span>
        <strong>{technology.title}</strong> (URL: {technology.url})
      </span>
      <div className="ml-auto flex items-center space-x-2">
        <button className="text-green-400 hover:underline">
          <Edit className="h-5 w-5" />
          <span className="sr-only">Editar</span>
        </button>
        <button onClick={onDelete} className="text-red-400 hover:underline">
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Excluir</span>
        </button>
      </div>
    </li>
  )
}
