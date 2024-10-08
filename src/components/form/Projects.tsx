'use client'

import { format, isDate } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import { Textarea } from '@/components/ui/textarea'
import { useProjectStore } from '@/lib/store'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function ProjectForm() {
  const [formState, action] = useFormState(upsertProject, { errors: {} })
  const {
    id,
    title,
    createdAt,
    description,
    websiteUrl,
    presentationVideoUrl,
    setTitle,
    setCreatedAt,
    setDescription,
    setWebsiteUrl,
    setPresentationVideoUrl,
    onReset,
  } = useProjectStore()

  useEffect(() => {
    if (formState?.success) {
      const message = id
        ? 'Projeto atualizado com sucesso.'
        : 'Projeto cadastrado com sucesso.'
      onReset()
      toast.success(message)
      formState.success = false
    }
  }, [formState?.success])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Novo Projeto</CardTitle>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-baseline gap-4">
            <input type="hidden" name="id" value={id} />
            <input
              type="hidden"
              name="created_at"
              value={createdAt?.toString()}
            />

            <div className="grid items-baseline gap-2.5 md:grid-cols-3">
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Informe o título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <ErrorMessage message={formState?.errors.title} />
              </div>

              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor="description">Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'justify-start bg-white text-left font-normal dark:border-zinc-600 dark:bg-zinc-800',
                        !createdAt && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {createdAt ? (
                        format(createdAt, "dd 'de' MMM. 'de' yyyy", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={createdAt}
                      onSelect={(newDate) =>
                        isDate(newDate) ? setCreatedAt(newDate) : null
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <ErrorMessage message={formState?.errors.created_at} />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Informe a descrição."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-48"
              />
              <ErrorMessage message={formState?.errors.description} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="website_url">URL do Site</Label>
              <Input
                id="website_url"
                name="website_url"
                placeholder="Informe a URL do site (opcional)"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
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
                value={presentationVideoUrl}
                onChange={(e) => setPresentationVideoUrl(e.target.value)}
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
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" onClick={onReset} variant="ghost">
            Resetar
          </Button>
          <SubmitButton title="Salvar" />
        </CardFooter>
      </form>
    </Card>
  )
}
