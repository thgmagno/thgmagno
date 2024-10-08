'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Project } from '@/lib/types'
import { deleteProject } from '@/server/services'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useProjectStore } from '@/lib/store'

export function ProjectItem({ project }: { project: Project }) {
  const { onEdit } = useProjectStore()

  const onConfirmDelete = () => {
    toast.promise(deleteProject(project.id as number), {
      loading: 'Processando...',
      success: 'Categoria deletada com sucesso.',
      error: 'Falha ao deletar a categoria.',
    })
  }

  return (
    <li>
      <Card className="relative flex flex-col">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>
            <p>
              Data:{' '}
              {format(project.created_at, "dd 'de' MMM. 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
            <p>
              Site:{' '}
              <Link
                target="_blank"
                href={project.website_url || '#'}
                className="hover:underline"
              >
                {project.website_url || 'Não informado'}
              </Link>
            </p>
            <p>
              Video:{' '}
              <Link
                target="_blank"
                href={project.presentation_video_url || '#'}
                className="hover:underline"
              >
                {project.presentation_video_url || 'Não informado'}
              </Link>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="min-w-fit space-x-2 self-start">
          {project.description}
        </CardContent>
        <CardFooter className="absolute right-0 top-5 space-x-2">
          <button
            onClick={() => {
              onEdit(project)
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
