import { BaseModel, ErrorModel, Result } from '@/application/models'
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

  async list(
    options: PaginationOptions
  ): Promise<Result<Pagination<BaseModel>>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const [data, total] = await repo.findAndCount({
      ...options
    })
    return Result.ok({
      ...options,
      data,
      total
    })
  }

  async find(id: string): Promise<Result<BaseModel>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const result = await repo.findOne(id)
    return result ? Result.ok(result) : Result.fail(ErrorModel.notFound())
  }

  async update(id: string, data: Partial<BaseModel>): Promise<Result<boolean>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const { affected } = await repo.update(id, data)
    return Number(affected) > 0
      ? Result.ok(true)
      : Result.fail(ErrorModel.notFound())
  }

  async delete(id: string): Promise<Result<boolean>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(this.entity)
    const { affected } = await repo.update(id, {
      isActive: false,
      isDeleted: true
    })
    return Number(affected) > 0
      ? Result.ok(true)
      : Result.fail(ErrorModel.notFound())
  }
}
