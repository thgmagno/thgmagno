'use client'

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useCategoryStore } from '@/lib/store'
import { Category } from '@/server/database.types'
import { deleteCategory } from '@/server/services'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function CategoryItem({ category }: { category: Category }) {
  const { onEdit } = useCategoryStore()

  const onConfirmDelete = () => {
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
        <CardFooter className="absolute top-5 right-0 space-x-2">
          <button
            onClick={() => {
              onEdit(category)
              window.scrollTo({ top: 100, behavior: 'smooth' })
            }}
            className="success hover:underline"
          >
            <Edit className="h-5 w-5" />
            <span className="sr-only">Editar</span>
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="danger hover:underline">
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Excluir</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Tem certeza de que deseja
                  continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirmDelete}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </li>
  )
}
