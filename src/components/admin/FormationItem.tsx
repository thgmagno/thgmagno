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
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { actions } from '@/actions'
import { FormationWithRelations } from '@/lib/types'
import { FormationForm } from '../form/FormationForm'
import { useActionState } from 'react'
import { CustomCard } from './CustomCard'
import { Formation } from '@prisma/client'
import { dateFormatBR } from '@/lib/utils'
import clsx from 'clsx'

export function FormationItem({
  formation,
}: {
  formation: FormationWithRelations
}) {
  return (
    <CustomCard>
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col space-y-1.5 overflow-hidden text-sm">
          {/* Ativo */}
          <p
            className={clsx('block text-xs font-semibold', {
              'text-green-500': formation.active,
              'text-red-500': !formation.active,
            })}
          >
            {formation.active ? 'Ativo' : 'Inativo'}
          </p>

          {/* Título */}
          <span className="font-medium capitalize">{formation.title}</span>

          {/* Categoria */}
          <p className="text-muted-foreground block text-xs font-semibold">
            Categoria: {formation.category.title}
          </p>

          {/* Início - Fim */}
          <p className="text-muted-foreground block text-xs font-semibold">
            {dateFormatBR(formation.startedAt)} -{' '}
            {formation.endedAt ? dateFormatBR(formation.endedAt) : 'Atual'}
          </p>

          {/* URL do certificado */}
          {formation.certificateUrl && (
            <Link
              target="_blank"
              href={formation.certificateUrl}
              className="text-muted-foreground block text-xs font-semibold hover:text-blue-400 hover:underline"
            >
              Acessar o certificado
            </Link>
          )}
        </div>
        <FormationActions formation={formation} />
      </div>
    </CustomCard>
  )
}

function FormationActions({ formation }: { formation: Formation }) {
  const [formState, action, isPending] = useActionState(
    actions.formation.update,
    { errors: {} },
  )

  const onConfirmDelete = () => {
    toast.promise(actions.formation.destroy(formation.id), {
      loading: 'Processando...',
      success: 'Formação deletada com sucesso.',
      error: 'Falha ao deletar a formação.',
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
          <FormationForm
            formState={formState}
            action={action}
            isPending={isPending}
            formation={formation}
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
              Excluir: {formation.title}
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
