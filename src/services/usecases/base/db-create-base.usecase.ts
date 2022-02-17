import { BaseModel, Result } from '@/domain/models'
import { Create, CreateRepository } from '@/domain/protocols'

type Props = {
  createRepository: CreateRepository
}

export class DbCreateBase implements Create {
  constructor(private readonly props: Props) {}

  async create(data: BaseModel): Promise<Result<BaseModel>> {
    const unitResult = await this.props.createRepository.create(data)
    return Result.ok(unitResult)
  }
}
