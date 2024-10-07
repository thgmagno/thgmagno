'use client'

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
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
    <li>
      <Card className="relative flex flex-col">
        <CardHeader>
          <CardTitle>{category.title}</CardTitle>
          <CardDescription>Slug: {category.slug}</CardDescription>
        </CardHeader>
        <CardFooter className="absolute right-0 top-5 space-x-2">
          <button className="success hover:underline">
            <Edit className="h-5 w-5" />
            <span className="sr-only">Editar</span>
          </button>
          <button onClick={onDelete} className="danger hover:underline">
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Excluir</span>
          </button>
        </CardFooter>
      </Card>
    </li>
  )
}
