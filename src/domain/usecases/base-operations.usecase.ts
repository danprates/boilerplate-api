import { BaseModel, Result } from '../models'
import { ListOptions, Pagination } from '../protocols/'

export interface Create {
  create: (data: Partial<BaseModel>) => Promise<Result<BaseModel>>
}

export interface List {
  list: (options: ListOptions) => Promise<Result<Pagination<BaseModel>>>
}

export interface Find {
  find: (id: string) => Promise<Result<BaseModel>>
}

export interface Update {
  update: (id: string, data: Partial<BaseModel>) => Promise<Result<boolean>>
}

export interface Delete {
  delete: (id: string) => Promise<Result<boolean>>
}
