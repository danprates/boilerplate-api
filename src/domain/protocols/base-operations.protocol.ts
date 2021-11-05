export interface Pagination<T = any> {
  data: T[]
  total: number
  skip: number
  take: number
}

export interface ListOptions<T = unknown> {
  pagination: {
    skip: number
    take: number
  }
  query?: Partial<T>
}
