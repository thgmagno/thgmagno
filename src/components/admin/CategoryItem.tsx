'use client'

import { Category } from '@/lib/types'
import { deleteCategory } from '@/server/services'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function CategoryItem({ category }: { category: Category }) {
  const onDelete = () => {
    toast.promise(deleteCategory(category.id as number), {
      loading: 'Processando...',
      success: 'Categoria deletada com sucesso.',
      error: 'Falha ao deletar a categoria.',
    })
  }

  return (
    <li className="flex items-center justify-between rounded-md border p-1.5">
      <span>
        <strong>{category.title}</strong> (Slug: {category.slug})
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
