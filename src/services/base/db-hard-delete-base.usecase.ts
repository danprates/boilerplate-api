import { Delete } from '@/domain/usecases'
import { HardDeleteRepository } from '../protocols'

export class DbHardDeleteBase implements Delete {
  constructor (private readonly deleteRepository: HardDeleteRepository) {}

  async delete (id: string): Promise<boolean> {
    const wasDeleted = await this.deleteRepository.hardDelete(id)

    if (!wasDeleted) {
      return false
    }

    return true
  }
}
