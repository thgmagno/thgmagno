import Link from 'next/link'

export function ProjectRecents() {
  const Card = () => (
    <div className="h-56 rounded-lg border p-2 shadow">
      <h1>Projeto</h1>
    </div>
  )

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <Card />
        <Card />
        <Card />
      </section>
      <div className="flex items-start justify-center">
        <Link
          href="/projetos"
          className="rounded-full bg-neutral-500 px-4 py-1 text-neutral-100 hover:bg-neutral-600"
        >
          Ver todos
        </Link>
      </div>
    </>
  )
}
