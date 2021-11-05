import { BaseModel, Result } from '@/domain/models'
import { ListOptions, Pagination } from '@/domain/protocols'
import { List } from '@/domain/usecases'
import { ListRepository } from '../../protocols'

export class DbListBase implements List {
  constructor (private readonly listRepository: ListRepository) {}

  async list (options: ListOptions): Promise<Result<Pagination<BaseModel>>> {
    return await this.listRepository.list(options)
  }
}
