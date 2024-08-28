import type { KgAndRu } from '~/types/common'
import type { Department } from '~/types/departments'

export interface Faculty<T> {
  id: string
  name: KgAndRu
  emoji: string
  departments: Department<T>[]
}
