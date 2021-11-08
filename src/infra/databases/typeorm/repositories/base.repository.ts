import { BaseModel } from '@/domain/models'
import { Pagination, PaginationOptions } from '@/domain/protocols'
import {
  CreateRepository, FindRepository,
  HardDeleteRepository,
  ListRepository,
  SoftDeleteRepository,
  UpdateRepository
} from '@/services/protocols'
import { TypeormHelper } from '../typeorm-helper'

export class BaseRepository
implements
    CreateRepository,
    ListRepository,
    FindRepository,
    UpdateRepository,
    SoftDeleteRepository,
    HardDeleteRepository {
  // TODO: ver uma forma de tipar a entity
  constructor (private readonly entity: any) {}

  async create (data: Partial<BaseModel>): Promise<BaseModel> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    return await repo.save(data)
  }

  async list (options: PaginationOptions): Promise<Pagination<BaseModel>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const [data, total] = await repo.findAndCount({
      ...options
    })
    return {
      ...options,
      data,
      total
    }
  }

  async find (id: string): Promise<BaseModel | undefined> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    return await repo.findOne(id)
  }

  async update (id: string, data: Partial<BaseModel>): Promise<boolean> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const { affected } = await repo.update(id, data)
    return Number(affected) > 0
  }

  async softDelete (id: string): Promise<boolean> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const { affected } = await repo.update(id, { isActive: false, isDeleted: true })
    return Number(affected) > 0
  }

  async hardDelete (id: string): Promise<boolean> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const { affected } = await repo.delete(id)
    return Number(affected) > 0
  }
}
