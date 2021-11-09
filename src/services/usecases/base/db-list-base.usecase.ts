import { BaseModel, Result } from '@/domain/models'
import { Pagination, PaginationOptions } from '@/domain/protocols'
import { List } from '@/domain/usecases'
import { ListRepository } from '../../protocols'

type Props = {
  listRepository: ListRepository
}

export class DbListBase implements List {
  constructor (private readonly props: Props) {}

  async list (options: PaginationOptions): Promise<Result<Pagination<BaseModel>>> {
    const result = await this.props.listRepository.list(options)
    return Result.ok(result)
  }
}
