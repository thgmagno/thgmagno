import { CategoryItem } from './CategoryItem'
import { actions } from '@/actions'

export async function Categories() {
  const categories = await actions.category.index()

  return (
    <section className="grid gap-4">
      <h2 className="mt-6 text-xl font-semibold">Categorias Cadastradas</h2>
      {categories.length > 0 ? (
        <>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </>
      ) : (
        <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
      )}
    </section>
  )
}
