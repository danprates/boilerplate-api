import { ErrorModel, Result } from '@/domain/models'
import { Delete } from '@/domain/protocols'
import { SoftDeleteRepository } from '../../protocols'

type Props = {
  deleteRepository: SoftDeleteRepository
}

export class DbSoftDeleteBase implements Delete {
  constructor(private readonly props: Props) {}

  async delete(id: string): Promise<Result<boolean>> {
    const deleted = await this.props.deleteRepository.softDelete(id)

    if (!deleted) {
      return Result.fail(ErrorModel.notFound())
    }

    return Result.ok(deleted)
  }
}
