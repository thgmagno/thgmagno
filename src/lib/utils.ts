import { clsx, type ClassValue } from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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

export const formatDate = (date: Date) => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  if (diffInDays <= 3) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR,
    }).replace('cerca de ', '')
  }

  return date.toLocaleDateString('pt-BR')
}
