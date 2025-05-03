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
import { CategoryProject } from '@prisma/client'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { actions } from '@/actions'
import { useActionState } from 'react'
import { CustomCard } from '@/components/admin/CustomCard'
import { CategoryProjectForm } from '@/components/form/CategoryProjectForm'

export function CategoryProjectItem({
  category,
}: {
  category: CategoryProject
}) {
  return (
    <CustomCard>
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col space-y-1.5 overflow-hidden text-sm">
          <b className="truncate">{category.label}</b>
          <span className="text-muted-foreground block text-xs font-semibold">
            Valor: {category.value}
          </span>
        </div>
        <CategoryActions category={category} />
      </div>
    </CustomCard>
  )
}

function CategoryActions({ category }: { category: CategoryProject }) {
  const [formState, action, isPending] = useActionState(
    actions.repository.upsertCategoryProject,
    { errors: {} },
  )

  const onConfirmDelete = () => {
    toast.promise(actions.repository.destroyCategoryProject(category.value), {
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
          <CategoryProjectForm
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
              Excluir: {category.value}
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
