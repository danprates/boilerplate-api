import { BaseModel, ErrorModel, Result } from '@/application/models'
import { Update, UpdateRepository } from '@/application/protocols'

type Props = {
  updateRepository: UpdateRepository
}

export class DbUpdateBase implements Update {
  constructor(private readonly props: Props) {}

  async update(id: string, data: Partial<BaseModel>): Promise<Result<boolean>> {
    const updated = await this.props.updateRepository.update(id, data)

    if (!updated) {
      return Result.fail(ErrorModel.notFound())
    }

    return Result.ok(updated)
  }
}
