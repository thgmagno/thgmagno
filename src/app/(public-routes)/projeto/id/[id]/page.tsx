import { Params } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function ProjetoID(props: { params: Params }) {
  const params = await props.params
  const id = params.id
  if (!id) redirect('/not-found')

  const res = await fetch(`https://api.github.com/repositories/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
  const data = await res.json()

  redirect(`/projeto/${data.name}`)
}
