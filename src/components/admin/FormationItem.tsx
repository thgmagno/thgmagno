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
import { useFormationStore } from '@/lib/store'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { actions } from '@/actions'
import { Category, Formation, Institution, Location } from '@prisma/client'

interface FormationComplete extends Formation {
  instituition:
    | Institution
    | (null & {
        location: Location | null
      })
  category: Category | null
}

export function FormationItem({ formation }: { formation: FormationComplete }) {
  const { onEdit } = useFormationStore()

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
                Fim:
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
          <button
            onClick={() => {
              onEdit(formation)
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
