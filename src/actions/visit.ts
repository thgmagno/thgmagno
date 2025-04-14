'use server'

import { prisma } from '@/lib/prisma'

export async function index() {
  return prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function count({
  data,
}: {
  data: {
    ipHash: string
    appName: string
    userAgent: string
    city: string
    state: string
    country: string
  }
}) {
  return prisma.visit.create({ data })
}

export async function getCountryName(sigla: string | null) {
  if (!sigla)
    return { countryName: 'Não encontrado', flag: null, subregion: null }

  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${sigla}`,
  ).then((response) => response.json())

  const countryName = response[0].name.common
    ? String(response[0].name.common)
    : 'Não encontrado'

  const flag = response[0].flag ? String(response[0].flag) : null

  const subregion = response[0].region ? String(response[0].subregion) : null
  const translatedSubregion = subregion
    ? await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
          subregion,
        )}`,
      )
        .then((res) => res.json())
        .then((res) => res[0]?.[0]?.[0] || subregion)
    : null

  const translation = {
    official: String(response[0].translations.por.official),
    common: String(response[0].translations.por.common),
  }

  return { countryName, flag, subregion: translatedSubregion, translation }
}
