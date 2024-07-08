'use server'

import { CosmicResponse } from '@/lib/cosmic.types'

export async function fetchData(): Promise<CosmicResponse> {
  const apiURL = process.env.COSMIC_API_URL as string

  const response = await fetch(apiURL).then((res) => res.json())

  return response as CosmicResponse
}
