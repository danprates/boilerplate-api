import { Result } from '@/domain/models'
import { ErrorModel } from '@/domain/models/error.model'
import { Delete } from '@/domain/usecases'
import { HardDeleteRepository } from '../../protocols'

type Props = {
  deleteRepository: HardDeleteRepository
}

export class DbHardDeleteBase implements Delete {
  constructor (private readonly props: Props) {}

  async delete (id: string): Promise<Result<boolean>> {
    const deleted = await this.props.deleteRepository.hardDelete(id)

    if (!deleted) {
      return Result.fail(ErrorModel.notFound())
    }

    return Result.ok(deleted)
  }
}
