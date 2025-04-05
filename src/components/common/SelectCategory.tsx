'use client'

import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Category } from '@prisma/client'
import { actions } from '@/actions'

export function SelectCategory({
  selectedCategory,
}: {
  selectedCategory?: number
}) {
  const [categories, setCategories] = React.useState<Category[]>([])

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await actions.category.index(true)
      setCategories(response)
    }

    fetchCategories()
  }, [])

  return (
    <Select
      name="categoryId"
      defaultValue={selectedCategory ? String(selectedCategory) : undefined}
    >
      <SelectTrigger>
        <SelectValue placeholder="Categorias" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
