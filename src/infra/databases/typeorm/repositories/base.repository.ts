import { BaseModel, ErrorModel, Result } from '@/domain/models'
import { Dependencies, Pagination, PaginationOptions } from '@/domain/protocols'
import { UserEntity } from '../entities'
import { TypeormHelper } from '../typeorm-helper'

export class BaseRepository implements Dependencies.Repository {
  async create(data: Partial<BaseModel>): Promise<Result<BaseModel>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const created = await repo.save(data)
    return Result.ok(created)
  }

  async list(
    options: PaginationOptions
  ): Promise<Result<Pagination<BaseModel>>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
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
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const result = await repo.findOne({ where: { id } })
    return result ? Result.ok(result) : Result.fail(ErrorModel.notFound())
  }

  async update(id: string, data: Partial<BaseModel>): Promise<Result<boolean>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const { affected } = await repo.update(id, data)
    return Number(affected) > 0
      ? Result.ok(true)
      : Result.fail(ErrorModel.notFound())
  }

  async softDelete(id: string): Promise<Result<boolean>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const { affected } = await repo.update(id, {
      isActive: false,
      isDeleted: true
    })
    return Number(affected) > 0
      ? Result.ok(true)
      : Result.fail(ErrorModel.notFound())
  }

  async hardDelete(id: string): Promise<Result<boolean>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const { affected } = await repo.delete(id)
    return Number(affected) > 0
      ? Result.ok(true)
      : Result.fail(ErrorModel.notFound())
  }
}
