import { BaseModel } from '../models/base.model'
import { ListOptions, Pagination } from '../protocols/'

export interface Create {
  create: (data: Partial<BaseModel>) => Promise<BaseModel>
}

export interface List {
  list: (options: ListOptions) => Promise<Pagination<BaseModel>>
}

export interface Find {
  find: (id: string) => Promise<BaseModel>
}

export interface Update {
  update: (id: string, data: Partial<BaseModel>) => Promise<boolean>
}

export interface Delete {
  delete: (id: string) => Promise<boolean>
}
