import { BaseModel } from '../entities'
import { Domain } from './domain.protocol'
import { Pagination, PaginationOptions } from './pagination.protocol'

export declare namespace Dependencies {
  export interface Logger {
    debug: (message: string, values?: any, useCaseName?: string) => void
    info: (message: string, values?: any, useCaseName?: string) => void
    warn: (message: string, values?: any, useCaseName?: string) => void
    error: (message: string, values?: any, useCaseName?: string) => void
    fatal: (message: string, values?: any, useCaseName?: string) => void
  }

  export interface Repository {
    create: (data: Partial<BaseModel>) => Promise<BaseModel>
    list: (options: PaginationOptions) => Promise<Pagination<BaseModel>>
    find: (id: string) => Promise<BaseModel | null>
    update: (id: string, data: Partial<BaseModel>) => Promise<boolean>
    softDelete: (id: string) => Promise<boolean>
    hardDelete: (id: string) => Promise<boolean>
  }

  export interface Validator {
    check: (data: Domain.Request, schemaName: string) => Domain.Request
  }

  export interface Container {
    logger: Logger
    validation: Validator
    repository: Repository
  }
}
