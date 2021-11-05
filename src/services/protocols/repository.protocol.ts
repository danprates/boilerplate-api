import { ListOptions, Pagination } from '@/domain/protocols'
import { BaseModel, Result } from '@/domain/models'

export interface CreateRepository {
  create: (data: Partial<BaseModel>) => Promise<Result<BaseModel>>
}

export interface ListRepository {
  list: (options: ListOptions) => Promise<Result<Pagination<BaseModel>>>
}

export interface FindRepository {
  find: (id: string) => Promise<Result<BaseModel>>
}

export interface UpdateRepository {
  update: (id: string, data: Partial<BaseModel>) => Promise<Result<boolean>>
}

export interface SoftDeleteRepository {
  softDelete: (id: string) => Promise<Result<boolean>>
}

export interface HardDeleteRepository {
  hardDelete: (id: string) => Promise<Result<boolean>>
}
