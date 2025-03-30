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
import { Institution } from '@prisma/client'
import { actions } from '@/actions'

export function SelectDate({
  selectedInstitution,
}: {
  selectedInstitution?: number
}) {
  const [institution, setInstitution] = React.useState<Institution[]>([])

  React.useEffect(() => {
    const fetchInstitution = async () => {
      const response = await actions.institution.index()
      setInstitution(response)
    }

    fetchInstitution()
  }, [])

  return (
    <Select
      name="institutionId"
      defaultValue={
        selectedInstitution ? String(selectedInstitution) : undefined
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Instituição" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Instituição</SelectLabel>
          {institution.map((institution) => (
            <SelectItem key={institution.id} value={String(institution.id)}>
              {institution.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
