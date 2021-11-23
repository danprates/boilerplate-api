import { Result } from '@/domain/models'
import { ErrorModel } from '@/domain/models/error.model'
import { Delete } from '@/domain/usecases'
import { SoftDeleteRepository } from '../../protocols'

type Props = {
  deleteRepository: SoftDeleteRepository
}

export class DbSoftDeleteBase implements Delete {
  constructor (private readonly props: Props) {}

  async delete (id: string): Promise<Result<boolean>> {
    const deleted = await this.props.deleteRepository.softDelete(id)

    if (!deleted) {
      return Result.fail(ErrorModel.notFound())
    }

    return Result.ok(deleted)
  }
}
