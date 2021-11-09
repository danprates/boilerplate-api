import { Result } from '@/domain/models'
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
      return Result.fail('Not found')
    }

    return Result.ok(deleted)
  }
}
