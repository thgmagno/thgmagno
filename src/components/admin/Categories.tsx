import { CategoryItem } from './CategoryItem'
import { actions } from '@/actions'

export async function Categories() {
  const categories = await actions.category.index()

  return (
    <div>
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
