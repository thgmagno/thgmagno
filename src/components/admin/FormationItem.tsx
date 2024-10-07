'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { useFormationStore } from '@/lib/store'
import { FormationWithCategory } from '@/lib/types'
import { deleteFormation } from '@/server/services'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export function FormationItem({
  formation,
}: {
  formation: FormationWithCategory
}) {
  const { onEdit } = useFormationStore()

  const onDelete = () => {
    toast.promise(deleteFormation(formation.id as number), {
      loading: 'Processando...',
      success: 'Formação deletada com sucesso.',
      error: 'Falha ao deletar a formação.',
    })
  }

  return (
    <li>
      <Card className="relative flex flex-col">
        <CardHeader>
          <CardTitle>{formation.title}</CardTitle>
          <CardDescription>
            <p>Duração: {formation.duration_time} horas</p>
            <p>Instituição: {formation.institution}</p>
            <p>Categoria: {formation.category_title || 'Não informado'}</p>
            <Link
              target="_blank"
              href={formation.certificate_url || '#'}
              className="hover:underline"
            >
              Acessar o certificado
            </Link>
          </CardDescription>
        </CardHeader>
        <CardFooter className="absolute right-0 top-5 space-x-2">
          <button
            onClick={() => onEdit(formation)}
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
