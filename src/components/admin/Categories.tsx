import { CategoryAdd } from './CategoryAdd'
import { CategoryItem } from './CategoryItem'
import { actions } from '@/actions'
import { CategoryProjectAdd } from './CategoryProjectAdd'
import { CategoryProjectItem } from './CategoryProjectItem'

export async function Categories() {
  const [categories, categoriesProject] = await Promise.all([
    actions.category.index(),
    actions.repository.fetcherCategoriesProject(),
  ])

  return (
    <section className="space-y-8">
      <article className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold sm:text-xl">Categoria de formação</h2>
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
      </article>

      <article className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold sm:text-xl">Categoria de projeto</h2>
          <CategoryProjectAdd />
        </div>
        {categoriesProject.length > 0 ? (
          <>
            {categoriesProject.map((category) => (
              <CategoryProjectItem key={category.value} category={category} />
            ))}
          </>
        ) : (
          <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
        )}
      </article>
    </section>
  )
}
