import { BaseModel, Result } from '@/application/models'
import { Pagination, PaginationOptions } from '@/application/protocols'

export interface CreateRepository {
  create: (data: Partial<BaseModel>) => Promise<Result<BaseModel>>
}

export interface ListRepository {
  list: (options: PaginationOptions) => Promise<Result<Pagination<BaseModel>>>
}

export interface FindRepository {
  find: (id: string) => Promise<Result<BaseModel>>
}

export interface UpdateRepository {
  update: (id: string, data: Partial<BaseModel>) => Promise<boolean>
}

export interface SoftDeleteRepository {
  delete: (id: string) => Promise<boolean>
}

export interface HardDeleteRepository {
  delete: (id: string) => Promise<boolean>
}
