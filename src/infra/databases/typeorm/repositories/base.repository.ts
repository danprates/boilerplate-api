import { BaseModel, Result } from '@/application/models'
import {
  CreateRepository,
  FindRepository,
  HardDeleteRepository,
  ListRepository,
  Pagination,
  PaginationOptions,
  SoftDeleteRepository,
  UpdateRepository
} from '@/application/protocols'
import { TypeormHelper } from '../typeorm-helper'

export class BaseRepository
  implements
    CreateRepository,
    ListRepository,
    FindRepository,
    UpdateRepository,
    SoftDeleteRepository,
    HardDeleteRepository
{
  constructor(private readonly entity: any) {}

  async create(data: Partial<BaseModel>): Promise<Result<BaseModel>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const created = await repo.save(data)
    return Result.ok(created)
  }

  async list(options: PaginationOptions): Promise<Pagination<BaseModel>> {
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

  async find(id: string): Promise<BaseModel | undefined> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    return repo.findOne(id)
  }

  async update(id: string, data: Partial<BaseModel>): Promise<boolean> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const { affected } = await repo.update(id, data)
    return Number(affected) > 0
  }

  async delete(id: string): Promise<boolean> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const { affected } = await repo.update(id, {
      isActive: false,
      isDeleted: true
    })
    return Number(affected) > 0
  }
}
