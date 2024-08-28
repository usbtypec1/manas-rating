import type { KgAndRu } from '~/types/common'
import type { Stage } from '~/types/stages'

export interface Department<T> {
  id: number
  name: KgAndRu
  emoji: string
  stages: Stage<T>[]
}
