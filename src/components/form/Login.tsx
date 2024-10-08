'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'
import { login } from '@/server/session'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { SubmitButton } from '@/components/common/SubmitButton'

export function Login() {
  const [formState, action] = useFormState(login, { errors: {} })

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Entrar como Administrador</CardTitle>
        <CardDescription>Identifique-se para continuar</CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user">Usuário</Label>
              <Input id="user" name="user" placeholder="Informe o usuário" />
              <ErrorMessage message={formState?.errors.user} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Informe a senha"
              />
              <ErrorMessage message={formState?.errors.password} />
            </div>
            <ErrorMessage
              message={formState?.errors._form}
              className="text-center"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <SubmitButton title="Acessar" />
        </CardFooter>
      </form>
    </Card>
  )
}
