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
import { Location } from '@prisma/client'
import { actions } from '@/actions'

export function SelectLocation({
  selectedLocation,
}: {
  selectedLocation?: number | null
}) {
  const [locations, setLocations] = React.useState<Location[]>([])

  React.useEffect(() => {
    const fetchLocations = async () => {
      const response = await actions.location.index()
      setLocations(response)
    }

    fetchLocations()
  }, [])

  return (
    <Select
      name="locationId"
      defaultValue={selectedLocation ? String(selectedLocation) : undefined}
    >
      <SelectTrigger>
        <SelectValue placeholder="Localizações" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Localizações</SelectLabel>
          <SelectItem key={0} value="undefined">
            Não informada
          </SelectItem>
          {locations.map((location) => (
            <SelectItem key={location.id} value={String(location.id)}>
              {location.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
