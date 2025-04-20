import { actions } from '@/actions'
import { Header } from './header'

export default async function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await actions.repository.fetcherCategoriesProject()

  return (
    <>
      <Header categories={categories} />
      {children}
    </>
  )
}
