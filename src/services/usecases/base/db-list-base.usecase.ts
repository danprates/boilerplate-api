import { BaseModel, Result } from '@/domain/models'
import { Pagination, PaginationOptions } from '@/domain/protocols'
import { List } from '@/domain/usecases'
import { ListRepository } from '../../protocols'

export class DbListBase implements List {
  constructor (private readonly listRepository: ListRepository) {}

  async list (options: PaginationOptions): Promise<Result<Pagination<BaseModel>>> {
    const result = await this.listRepository.list(options)
    return Result.ok(result)
  }
}
