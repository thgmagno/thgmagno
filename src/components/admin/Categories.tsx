import { CategoryForm } from '@/components/form/Category'
import { findManyCategories } from '@/server/actions'
import { CategoryItem } from './CategoryItem'

export async function Categories() {
  const categories = await findManyCategories()

  return (
    <div>
      <CategoryForm />
      <h2 className="mt-6 text-xl font-semibold">Categorias Cadastradas</h2>
      <div className="mt-4">
        {categories.length > 0 ? (
          <ul className="list-inside list-disc space-y-2">
            {categories.map((category) => (
              <CategoryItem category={category} key={category.id} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
        )}
      </div>
    </div>
  )
}
