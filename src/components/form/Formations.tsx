'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { SubmitButton } from '@/components/common/SubmitButton'
import { upsertFormation } from '@/server/services'
import { Category } from '@/lib/types'
import { useFormationStore } from '@/lib/store'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export function FormationForm({ categories }: { categories: Category[] }) {
  const [formState, action] = useFormState(upsertFormation, { errors: {} })
  const {
    id,
    title,
    institution,
    categoryId,
    duration_time: durationTime,
    certificate_url: certificateUrl,
    setTitle,
    setInstitution,
    setCategoryId,
    setDurationTime,
    setCertificateUrl,
    onReset,
  } = useFormationStore()

  useEffect(() => {
    if (formState?.success) {
      const message = id
        ? 'Formação atualizada com sucesso.'
        : 'Formação cadastrada com sucesso.'
      onReset()
      toast.success(message)
      formState.success = false
    }
  }, [formState?.success])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Nova Formação</CardTitle>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-baseline gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value={id} />
            <div className="flex flex-col space-y-1.5">
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="institution">Instituição</Label>
              <Input
                id="institution"
                name="institution"
                placeholder="Informe a instituição"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
              <ErrorMessage message={formState?.errors.institution} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration_time">Categoria</Label>
              <Select
                name="category"
                value={categoryId}
                onValueChange={(value) => setCategoryId(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ErrorMessage message={formState?.errors.category} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration_time">Duração (em horas)</Label>
              <Input
                id="duration_time"
                name="duration_time"
                type="number"
                placeholder="Informe a duração em horas"
                value={durationTime}
                onChange={(e) => setDurationTime(e.target.value)}
              />
              <ErrorMessage message={formState?.errors.duration_time} />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="certificate_url">URL do Certificado</Label>
              <Input
                id="certificate_url"
                name="certificate_url"
                placeholder="Informe a URL do certificado (opcional)"
                value={certificateUrl || ''}
                onChange={(e) => setCertificateUrl(e.target.value)}
              />
              <ErrorMessage message={formState?.errors.certificate_url} />
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
