'use client'

import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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

export function FormationItem({
  formation,
}: {
  formation: FormationWithRelations
}) {
  const [formState, action, isPending] = useActionState(
    actions.formation.update,
    { errors: {} },
  )

  const onConfirmDelete = () => {
    toast.promise(actions.formation.destroy(formation.id), {
      loading: 'Processando...',
      success: 'Categoria deletada com sucesso.',
      error: 'Falha ao deletar a categoria.',
    })
  }

  return (
    <li>
      <Card className="relative flex flex-col">
        <CardHeader>
          <CardTitle>{formation.title}</CardTitle>
          <div className="text-muted-foreground text-sm">
            <p>
              Início:{' '}
              {new Intl.DateTimeFormat('pt-BR').format(formation.startedAt)}
            </p>
            {formation.endedAt && (
              <p>
                Término:
                {new Intl.DateTimeFormat('pt-BR').format(formation.endedAt)}
              </p>
            )}
            <p>Status: {formation.endedAt ? 'Concluído' : 'Em andamento'}</p>
            <Link
              target="_blank"
              href={formation.certificateUrl || '#'}
              className="hover:underline"
            >
              Acessar o certificado
            </Link>
          </div>
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
              <FormationForm
                formState={formState}
                action={action}
                isPending={isPending}
                formation={formation}
              />
            </DialogContent>
          </Dialog>
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
