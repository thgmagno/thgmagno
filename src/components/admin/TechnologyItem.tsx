'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { useTechnologyStore } from '@/lib/store'
import { Technology } from '@/lib/types'
import { deleteTechnology } from '@/server/services'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export function TechnologyItem({ technology }: { technology: Technology }) {
  const { onEdit } = useTechnologyStore()

  const onDelete = () => {
    toast.promise(deleteTechnology(technology.id as number), {
      loading: 'Processando...',
      success: 'Tecnologia deletada com sucesso.',
      error: 'Falha ao deletar a tecnologia.',
    })
  }

  return (
    <li>
      <Card className="relative flex flex-col">
        <CardHeader>
          <CardTitle>{technology.title}</CardTitle>
          <CardDescription>
            URL:{' '}
            <Link
              target="_blank"
              href={technology.url}
              className="hover:underline"
            >
              {technology.url}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardFooter className="absolute right-0 top-5 space-x-2">
          <button
            onClick={() => onEdit(technology)}
            className="success hover:underline"
          >
            <Edit className="h-5 w-5" />
            <span className="sr-only">Editar</span>
          </button>
          <button onClick={onDelete} className="danger hover:underline">
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Excluir</span>
          </button>
        </CardFooter>
      </Card>
    </li>
  )
}
