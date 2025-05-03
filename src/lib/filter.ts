import { Filter } from 'bad-words'
import pt from 'naughty-words/pt.json'

export function isValidComment(text: string) {
  const filter = new Filter({ list: [...pt] })
  const normalizar = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  return !filter.isProfane(normalizar(text))
}
