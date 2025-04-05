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
import clsx from 'clsx'
import { CustomCard } from './CustomCard'
import { InstitutionWithLocation } from '@/lib/types'
import { actions } from '@/actions'
import { Institution } from '@prisma/client'
import { useActionState } from 'react'
import { toast } from 'sonner'
import { InstitutionForm } from '../form/InstitutionForm'

export function InstitutionItem({
  institution,
}: {
  institution: InstitutionWithLocation
}) {
  const formatCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
  }

  return (
    <CustomCard>
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col space-y-1.5 overflow-hidden text-sm">
          {/* Nome */}
          <span className="font-medium capitalize">{institution.name}</span>

          {/* Modalidade */}
          <p className="text-muted-foreground block text-xs font-semibold">
            Modalidade:{' '}
            <span
              className={clsx({
                'text-green-500': institution.modality === 'ONLINE',
                'text-yellow-500': institution.modality === 'HIBRIDO',
                'text-blue-500': institution.modality === 'PRESENCIAL',
              })}
            >
              {formatCase(institution.modality)}
            </span>
          </p>

          {/* Localização */}
          <p className="text-muted-foreground block text-xs font-semibold">
            Localização:{' '}
            <span
              className={clsx({
                'text-green-500': !!institution.location,
              })}
            >
              {institution.location?.title ?? 'Não informada'}
            </span>
          </p>
        </div>
        <InstitutionActions institution={institution} />
      </div>
    </CustomCard>
  )
}

function InstitutionActions({ institution }: { institution: Institution }) {
  const [formState, action, isPending] = useActionState(
    actions.institution.update,
    { errors: {} },
  )

  const onConfirmDelete = () => {
    toast.promise(actions.institution.destroy(institution.id), {
      loading: 'Processando...',
      success: 'Instituição deletada com sucesso.',
      error: 'Falha ao deletar a instituição.',
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
          <InstitutionForm
            formState={formState}
            action={action}
            isPending={isPending}
            institution={institution}
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
              Excluir: {institution.name}
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
