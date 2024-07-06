'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ToggleCategory() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    const searchString = searchParams.get('categoria') || ''
    const categories = searchString ? searchString.split(',') : []
    setSelectedCategories(categories)
  }, [searchParams])

  function handleFilters(value: string) {
    const params = new URLSearchParams(searchParams)
    const searchString = params.get('categoria') || ''
    const categories = searchString ? searchString.split(',') : []

    if (categories.includes(value)) {
      const updatedCategories = categories.filter(
        (category) => category !== value,
      )
      if (updatedCategories.length > 0) {
        params.set('categoria', updatedCategories.join(','))
      } else {
        params.delete('categoria')
      }
    } else {
      categories.push(value)
      params.set('categoria', categories.join(','))
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <section className="my-3 flex flex-wrap items-center gap-2 text-sm md:justify-center">
      Filtros:
      <button
        onClick={() => handleFilters('frontend')}
        className={`px-2 py-1 ${selectedCategories.includes('frontend') ? 'rounded-full bg-neutral-600 text-neutral-100' : ''}`}
      >
        Front-end
      </button>
      <button
        onClick={() => handleFilters('backend')}
        className={`px-2 py-1 ${selectedCategories.includes('backend') ? 'rounded-full bg-neutral-600 text-neutral-100' : ''}`}
      >
        Back-end
      </button>
      <button
        onClick={() => handleFilters('ferramentas')}
        className={`px-2 py-1 ${selectedCategories.includes('ferramentas') ? 'rounded-full bg-neutral-600 text-neutral-100' : ''}`}
      >
        Ferramentas
      </button>
    </section>
  )
}
