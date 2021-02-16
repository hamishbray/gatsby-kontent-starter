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

export type KontentResult<T, N extends string> = {
  errors?: any
  data?: KontentItem<T, N>
}

export type AllKontentResult<T, U extends string> = {
  errors?: any
  data?: AllKontentItem<T, U>
}
