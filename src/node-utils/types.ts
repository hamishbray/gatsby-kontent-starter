type Fields = {
  slug: string
}

interface Nodes<T> {
  node: {
    fields: Fields
    elements: T
  }
}

interface KontentItem<T, U> {
  [U: string]: Nodes<T>
}

interface AllKontentItem<T, U> {
  [U: string]: {
    edges: Nodes<T>[]
  }
}

export interface AllKontentResult<T, U> {
  errors?: any
  data?: AllKontentItem<T, U>
}

export interface KontentResult<T, U> {
  errors?: any
  data?: KontentItem<T, U>
}
