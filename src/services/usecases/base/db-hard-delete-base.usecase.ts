import { Result } from '@/domain/models'
import { Delete } from '@/domain/usecases'
import { HardDeleteRepository } from '../../protocols'

export class DbHardDeleteBase implements Delete {
  constructor (private readonly deleteRepository: HardDeleteRepository) {}

  async delete (id: string): Promise<Result<boolean>> {
    const deleted = await this.deleteRepository.hardDelete(id)

    if (!deleted) {
      return Result.fail('Not found')
    }

    return Result.ok(deleted)
  }
}
