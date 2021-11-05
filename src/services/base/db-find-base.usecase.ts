import { BaseModel } from '@/domain/models'
import { Find } from '@/domain/usecases'
import { FindRepository } from '../protocols'

export class DbFindBase implements Find {
  constructor (private readonly findRepository: FindRepository) {}

  async find (id: string): Promise<BaseModel> {
    return await this.findRepository.find(id)
  }
}