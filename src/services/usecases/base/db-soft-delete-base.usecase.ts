import { Result } from '@/domain/models'
import { Delete } from '@/domain/usecases'
import { SoftDeleteRepository } from '../../protocols'

export class DbSoftDeleteBase implements Delete {
  constructor (private readonly deleteRepository: SoftDeleteRepository) {}

  async delete (id: string): Promise<Result<boolean>> {
    return await this.deleteRepository.softDelete(id)
  }
}
