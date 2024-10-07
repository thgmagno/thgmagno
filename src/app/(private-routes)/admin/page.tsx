import { AdminDashboard } from '@/components/admin'

export default async function Admin() {
  return (
    <section className="space-y-6">
      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Painel do Administrador
      </h1>
      <AdminDashboard />
    </section>
  )
}
