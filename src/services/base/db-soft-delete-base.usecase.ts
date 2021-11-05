import { Delete } from '@/domain/usecases'
import { SoftDeleteRepository } from '../protocols'

export class DbSoftDeleteBase implements Delete {
  constructor (private readonly deleteRepository: SoftDeleteRepository) {}

  async delete (id: string): Promise<boolean> {
    const wasDeleted = await this.deleteRepository.softDelete(id)

    if (!wasDeleted) {
      return false
    }

    return true
  }
}
