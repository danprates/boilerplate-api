import Response from '../entities/response'

export declare namespace Domain {
  export type Request = {
    headers?: any
    query?: any
    params?: any
    body?: any
    user?: any
  }

  export type MetaData = {
    name: string
    description: string
    route: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    type: 'Query' | 'Mutation'
  }

  export interface UseCase {
    getMetaData: () => MetaData
    isAuthorized: (request: Request) => void
    execute: (request: Request) => Promise<Response>
  }

  export type Pagination<T = any> = PaginationOptions & {
    total: number
    data: T[]
  }

  export type PaginationOptions = {
    skip: number
    take: number
  }
}
