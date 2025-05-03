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
import { Location } from '@prisma/client'
import { CustomCard } from '@/components/admin/CustomCard'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { toast } from 'sonner'
import { LocationForm } from '@/components/form/LocationForm'

export function LocationItem({ location }: { location: Location }) {
  return (
    <CustomCard>
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col space-y-1.5 overflow-hidden text-sm">
          {/* Título */}
          <span className="font-medium capitalize">{location.title}</span>
        </div>
        <LocationActions location={location} />
      </div>
    </CustomCard>
  )
}

function LocationActions({ location }: { location: Location }) {
  const [formState, action, isPending] = useActionState(
    actions.location.update,
    { errors: {} },
  )

  const onConfirmDelete = () => {
    toast.promise(actions.location.destroy(location.id), {
      loading: 'Processando...',
      success: 'Localização deletada com sucesso.',
      error: 'Falha ao deletar a localização.',
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
          <LocationForm
            formState={formState}
            action={action}
            isPending={isPending}
            location={location}
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
              Excluir: {location.title}
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
