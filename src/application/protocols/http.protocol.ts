import { PaginationOptions } from '@/application/protocols'

export interface HttpRequest<T = unknown> {
  body?: any
  params?: any
  query?: PaginationOptions & Partial<T>
}

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}
