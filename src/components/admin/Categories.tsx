import { CategoryAdd } from './CategoryAdd'
import { CategoryItem } from './CategoryItem'
import { actions } from '@/actions'

export async function Categories() {
  const categories = await actions.category.index()

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold sm:text-xl">Categorias cadastradas</h2>
        <CategoryAdd />
      </div>
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
