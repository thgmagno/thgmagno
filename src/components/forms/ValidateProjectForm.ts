// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NestedObject = { [key: string]: any }

export function ValidateProjectForm(obj: NestedObject): boolean {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (!ValidateProjectForm(obj[key])) {
        return false
      }
    } else if (
      obj[key] === '' ||
      obj[key] === null ||
      obj[key] === undefined ||
      (Array.isArray(obj[key]) && obj[key].length === 0)
    ) {
      return false
    }
  }
  return true
}
