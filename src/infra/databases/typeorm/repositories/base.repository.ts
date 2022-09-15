import { BaseModel, ErrorEntity } from '@/domain/entities'
import { Dependencies, Domain } from '@/domain/protocols'
import { UserEntity } from '../entities'
import { TypeormHelper } from '../typeorm-helper'

export class BaseRepository implements Dependencies.Repository {
  async create(data: Partial<BaseModel>): Promise<BaseModel> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    return await repo.save(data)
  }

  async list(
    options: Domain.PaginationOptions
  ): Promise<Domain.Pagination<BaseModel>> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const [data, total] = await repo.findAndCount({
      ...options
    })
    return {
      ...options,
      data,
      total
    }
  }

  async find(id: string): Promise<BaseModel | null> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const result = await repo.findOne({ where: { id } })
    return result ?? null
  }

  async update(id: string, data: Partial<BaseModel>): Promise<boolean> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const { affected } = await repo.update(id, data)
    if (Number(affected) > 0) return true
    throw ErrorEntity.notFound()
  }

  async softDelete(id: string): Promise<boolean> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const { affected } = await repo.update(id, {
      isActive: false,
      isDeleted: true
    })
    if (Number(affected) > 0) return true
    throw ErrorEntity.notFound()
  }

  async hardDelete(id: string): Promise<boolean> {
    const repo = await TypeormHelper.getRepository<BaseModel>(UserEntity)
    const { affected } = await repo.delete(id)
    if (Number(affected) > 0) return true
    throw ErrorEntity.notFound()
  }
}
