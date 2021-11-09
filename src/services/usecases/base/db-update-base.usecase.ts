import { BaseModel, Result } from '@/domain/models'
import { Update } from '@/domain/usecases'
import { UpdateRepository } from '../../protocols'

type Props = {
  updateRepository: UpdateRepository
}

export class DbUpdateBase implements Update {
  constructor (private readonly props: Props) {}

  async update (id: string, data: Partial<BaseModel>): Promise<Result<boolean>> {
    const updated = await this.props.updateRepository.update(id, data)

    if (!updated) {
      return Result.fail('Not found')
    }

    return Result.ok(updated)
  }
}
