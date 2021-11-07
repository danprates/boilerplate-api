import { PaginationOptions } from '@/domain/protocols'

export interface HttpRequest<T = unknown> {
  body?: any
  params?: any
  query?: PaginationOptions & Partial<T>
}

export interface HttpResponse {
  statusCode: number
  body: any
}
