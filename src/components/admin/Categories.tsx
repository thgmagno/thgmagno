import { unstable_cache as cache } from 'next/cache'
import { CategoryForm } from '@/components/form/Category'
import { findManyCategories } from '@/server/actions'
import { CategoryItem } from './CategoryItem'

export async function Categories() {
  const getCategories = cache(
    async () => {
      return await findManyCategories()
    },
    ['categories'],
    { revalidate: 7 * 24 * 60 * 60, tags: ['categories'] },
  )

  const categories = await getCategories()

  return (
    <div>
      <CategoryForm />
      <h2 className="mt-6 text-xl font-semibold">Categorias Cadastradas</h2>
      <div className="mt-4">
        {categories.length > 0 ? (
          <ul className="space-y-3">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
        )}
      </div>
    </div>
  )
}
