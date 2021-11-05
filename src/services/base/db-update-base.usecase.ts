import { BaseModel } from '@/domain/models'
import { Update } from '@/domain/usecases'
import { UpdateRepository } from '../protocols'

export class DbUpdateBase implements Update {
  constructor (private readonly updateRepository: UpdateRepository) {}

  async update (id: string, data: Partial<BaseModel>): Promise<boolean> {
    const wasUpdated = await this.updateRepository.update(id, data)

    if (!wasUpdated) {
      return false
    }

    return true
  }
}
