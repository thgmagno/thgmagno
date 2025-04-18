import { Suspense } from 'react'
import { ProjetosAnimated } from './animated'
import { actions } from '@/actions'

export default async function Projetos() {
  const response = await actions.repository.fetcherRepositories()

  if (response.incomplete_results) return <IncompleteResults />
  if (!response.total_count) return <EmptyResults />

  return (
    <Suspense fallback={'Carregando...'}>
      <section className="space-y-6">
        <ProjetosAnimated projects={response.items} />
      </section>
    </Suspense>
  )
}

function IncompleteResults() {
  return (
    <div className="rounded-md border border-neutral-800 p-3">
      <h2 className="mb-2 font-medium">
        Não foi possível carregar os repositórios no momento.
      </h2>
      <p className="text-sm text-neutral-400">
        Verifique sua conexão com a internet e tente novamente. Se o problema
        persistir, pode ser devido a falta de permissões, limite de requisições
        ou erro na API do GitHub.
      </p>
    </div>
  )
}

function EmptyResults() {
  return (
    <div className="rounded-md border border-neutral-800 p-3">
      <h2 className="mb-2 font-medium">
        Nenhum projeto disponível no momento.
      </h2>
      <p className="text-sm text-neutral-400">
        Ainda não há projetos listados aqui. Volte mais tarde para conferir
        novidades!
      </p>
    </div>
  )
}
