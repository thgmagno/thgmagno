import { AdminDashboard } from '@/components/admin'
import Link from 'next/link'

export default async function Admin() {
  return (
    <section className="space-y-6">
      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Painel do Administrador
      </h1>
      <Link
        href="/"
        className="text-muted-foreground mt-2 text-sm hover:text-sky-600 hover:underline"
      >
        Ir para o site
      </Link>
      <AdminDashboard />
    </section>
  )
}
