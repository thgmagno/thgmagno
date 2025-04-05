'use client'

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
import { CustomCard } from './CustomCard'

export function CategoryItem({ category }: { category: Category }) {
  return (
    <CustomCard>
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col space-y-1.5 overflow-hidden text-sm">
          <b className="truncate capitalize">{category.title}</b>
          <span className="text-muted-foreground block text-xs font-semibold">
            Slug: {category.slug}
          </span>
          <span className="text-muted-foreground block text-xs font-semibold">
            Ativo:{' '}
            {category.active ? (
              <span className="text-green-500">sim</span>
            ) : (
              <span className="text-red-500">não</span>
            )}
          </span>
        </div>
        <CategoryActions category={category} />
      </div>
    </CustomCard>
  )
}

function CategoryActions({ category }: { category: Category }) {
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
    <div className="flex items-start gap-1 px-3">
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
            <AlertDialogTitle className="text-base">
              Excluir categoria: {category.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja continuar?
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
    </div>
  )
}
