export type Fields = {
  slug: string
}

export type KontentItem<T> = {
	fields: Fields
	elements: T
	id: string
}

type AllKontentItem<T, U extends string> = {
  [u in U]: {
    nodes: KontentItem<T>[]
  }
}

export type KontentResult<T, N extends string> = {
  errors?: any
  data?: {
		[n in N]: KontentItem<T>
	}
}

export type AllKontentResult<T, U extends string> = {
  errors?: any
  data?: AllKontentItem<T, U>
}
