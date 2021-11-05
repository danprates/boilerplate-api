import { BaseModel } from '@/domain/models'
import { Create } from '@/domain/usecases'
import { CreateRepository } from '../protocols'

export class DbCreateBase implements Create {
  constructor (private readonly createRepository: CreateRepository) {}

  async create (data: BaseModel): Promise<BaseModel> {
    const unitResult = await this.createRepository.create(data)
    return unitResult
  }
}
