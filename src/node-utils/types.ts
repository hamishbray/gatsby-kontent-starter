type Fields = {
  slug: string
}

export type KontentItem<T, N extends string = 'node'> = {
  [n in N]: {
    fields: Fields
    elements: T
  }
}

type AllKontentItem<T, U extends string> = {
  [u in U]: {
    edges: KontentItem<T>[]
  }
}

export interface KontentResult<T, U extends string> {
  errors?: any
  data?: KontentItem<T, U>
}

export interface AllKontentResult<T, U extends string> {
  errors?: any
  data?: AllKontentItem<T, U>
}

