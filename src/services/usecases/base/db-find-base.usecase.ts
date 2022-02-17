import { BaseModel, ErrorModel, Result } from '@/domain/models'
import { Find, FindRepository } from '@/domain/protocols'

type Props = {
  findRepository: FindRepository
}

export class DbFindBase implements Find {
  constructor(private readonly props: Props) {}

  async find(id: string): Promise<Result<BaseModel>> {
    const result = await this.props.findRepository.find(id)

    if (!result) {
      return Result.fail(ErrorModel.notFound())
    }

    return Result.ok(result)
  }
}
