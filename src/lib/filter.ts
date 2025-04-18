import { Filter } from 'bad-words'
import pt from 'naughty-words/pt.json'

const filter = new Filter({ list: [...pt] })

function normalizar(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function isValidComment(text: string) {
  return !filter.isProfane(normalizar(text))
}
