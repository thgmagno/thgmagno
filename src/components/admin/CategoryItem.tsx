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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Category } from '@prisma/client'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { actions } from '@/actions'
import { useActionState } from 'react'
import { CategoryForm } from '../form/CategoryForm'

export function CategoryItem({ category }: { category: Category }) {
  const [formState, action, isPending] = useActionState(
    actions.category.update,
    { errors: {} },
  )

  const onConfirmDelete = () => {
    toast.promise(actions.category.destroy(category.id), {
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
          <Dialog>
            <DialogTrigger asChild>
              <Edit className="h-5 w-5 text-green-500" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar</DialogTitle>
              </DialogHeader>
              <CategoryForm
                formState={formState}
                action={action}
                isPending={isPending}
                category={category}
              />
            </DialogContent>
          </Dialog>
          <button
            onClick={() => {
              window.scrollTo({ top: 100, behavior: 'smooth' })
            }}
            className="success hover:underline"
          ></button>
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
