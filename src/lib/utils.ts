import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateTitle = (name: string) => {
  const normalized = name.replaceAll('-', ' ').replaceAll('_', ' ')
  return normalized
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function dateFormatBR(data: Date) {
  const [ano, mes, dia] = data.toISOString().split('T')[0].split('-')
  return `${dia}/${mes}/${ano}`
}
