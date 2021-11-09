import { BaseModel, Result } from '@/domain/models'
import { Find } from '@/domain/usecases'
import { FindRepository } from '../../protocols'

type Props = {
  findRepository: FindRepository
}

export class DbFindBase implements Find {
  constructor (private readonly props: Props) {}

  async find (id: string): Promise<Result<BaseModel>> {
    const result = await this.props.findRepository.find(id)

    if (!result) {
      return Result.fail('Not found')
    }

    return Result.ok(result)
  }
}
