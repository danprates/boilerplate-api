import { BaseModel, Result } from '@/domain/models'
import { Create } from '@/domain/usecases'
import { CreateRepository } from '../../protocols'

export class DbCreateBase implements Create {
  constructor (private readonly createRepository: CreateRepository) {}

  async create (data: BaseModel): Promise<Result<BaseModel>> {
    const unitResult = await this.createRepository.create(data)
    return Result.ok(unitResult)
  }
}
