import { ListOptions, Pagination } from '@/domain/protocols'
import { BaseModel } from '@/domain/models'

export interface CreateRepository {
  create: (data: Partial<BaseModel>) => Promise<BaseModel>
}

export interface ListRepository {
  list: (options: ListOptions) => Promise<Pagination<BaseModel>>
}

export interface FindRepository {
  find: (id: string) => Promise<BaseModel>
}

export interface UpdateRepository {
  update: (id: string, data: Partial<BaseModel>) => Promise<boolean>
}

export interface SoftDeleteRepository {
  softDelete: (id: string) => Promise<boolean>
}

export interface HardDeleteRepository {
  hardDelete: (id: string) => Promise<boolean>
}
