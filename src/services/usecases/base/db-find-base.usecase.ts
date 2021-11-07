import { BaseModel, Result } from '@/domain/models'
import { Find } from '@/domain/usecases'
import { FindRepository } from '../../protocols'

export class DbFindBase implements Find {
  constructor (private readonly findRepository: FindRepository) {}

  async find (id: string): Promise<Result<BaseModel>> {
    const result = await this.findRepository.find(id)

    if (!result) {
      return Result.fail('Not found')
    }

    return Result.ok(result)
  }
}
