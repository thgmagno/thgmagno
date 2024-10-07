'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { SubmitButton } from '@/components/common/SubmitButton'
import { upsertProject } from '@/server/services'

export function ProjectForm() {
  const [formState, action] = useFormState(upsertProject, { errors: {} })

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Cadastrar Novo Projeto</CardTitle>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-baseline gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value="" />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" placeholder="Informe o título" />
              <ErrorMessage message={formState?.errors.title} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                name="description"
                placeholder="Informe a descrição"
              />
              <ErrorMessage message={formState?.errors.description} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="Informe o slug" />
              <ErrorMessage message={formState?.errors.slug} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="website_url">URL do Site</Label>
              <Input
                id="website_url"
                name="website_url"
                placeholder="Informe a URL do site (opcional)"
              />
              <ErrorMessage message={formState?.errors.website_url} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="presentation_video_url">
                URL do Vídeo de Apresentação
              </Label>
              <Input
                id="presentation_video_url"
                name="presentation_video_url"
                placeholder="Informe a URL do vídeo de apresentação (opcional)"
              />
              <ErrorMessage
                message={formState?.errors.presentation_video_url}
              />
            </div>
          </div>
          <ErrorMessage
            message={formState?.errors._form}
            className="text-center"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton title="Cadastrar" />
        </CardFooter>
      </form>
    </Card>
  )
}
