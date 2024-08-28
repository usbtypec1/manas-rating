export interface Stage<T> {
  number: number
  quota: number
  applicants: T[]
}
