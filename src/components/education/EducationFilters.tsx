'use client'

import { useLanguageStore } from '@/lib/store/languageStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function EducationFilters({ categories }: { categories: string[] }) {
  const { language } = useLanguageStore()
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

  const dict = {
    portuguese: {
      label: 'Filtros',
    },
    english: {
      label: 'Filters',
    },
  }

  return (
    <section className="my-3 flex flex-wrap items-center gap-2 text-sm md:justify-center">
      {dict[language].label}:
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => handleFilters(item)}
          className={`px-2 py-1 ${selectedCategories.includes(item) ? 'rounded-full bg-neutral-600 text-neutral-100' : ''}`}
        >
          {item}
        </button>
      ))}
    </section>
  )
}
