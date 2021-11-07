export interface Pagination<T = any> extends PaginationOptions {
  data: T[]
  total: number
}

export interface PaginationOptions {
  skip: number
  take: number
}
