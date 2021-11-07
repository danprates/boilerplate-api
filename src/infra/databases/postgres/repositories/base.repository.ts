import { BaseModel, Result } from '@/domain/models'
import { Pagination, PaginationOptions } from '@/domain/protocols'
import {
  CreateRepository, FindRepository,
  HardDeleteRepository,
  ListRepository,
  SoftDeleteRepository,
  UpdateRepository
} from '@/services/protocols'
import { PostgresHelper } from '../postgres-helper'

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

  async create (data: Partial<BaseModel>): Promise<Result<BaseModel>> {
    const repo = await PostgresHelper.getRepository<BaseModel>(this.entity)
    const entity = await repo.save(data)
    return Result.ok(entity)
  }

  async list (options: PaginationOptions): Promise<Result<Pagination<BaseModel>>> {
    const repo = await PostgresHelper.getRepository<BaseModel>(this.entity)
    const [data, total] = await repo.findAndCount({
      ...options
    })
    return Result.ok({
      ...options,
      data,
      total
    })
  }

  async find (id: string): Promise<Result<BaseModel>> {
    const repo = await PostgresHelper.getRepository<BaseModel>(this.entity)
    const entity = await repo.findOne(id)
    return Result.ok(entity)
  }

  async update (id: string, service: Partial<BaseModel>): Promise<Result<boolean>> {
    const repo = await PostgresHelper.getRepository<BaseModel>(this.entity)
    const { affected = 0 } = await repo.update(id, service)
    return Result.ok(affected > 0)
  }

  async softDelete (id: string): Promise<Result<boolean>> {
    const repo = await PostgresHelper.getRepository<BaseModel>(this.entity)
    const { affected = 0 } = await repo.update(id, { isActive: false } as any)
    return Result.ok(affected > 0)
  }

  async hardDelete (id: string): Promise<Result<boolean>> {
    const repo = await PostgresHelper.getRepository<BaseModel>(this.entity)
    const { affected = 0 } = await repo.delete(id)
    return Result.ok(Number(affected) > 0)
  }
}
