import { BaseModel, Result } from '@/application/models'
import {
  List,
  ListRepository,
  Pagination,
  PaginationOptions
} from '@/application/protocols'

type Props = {
  listRepository: ListRepository
}

export class DbListBase implements List {
  constructor(private readonly props: Props) {}

  async list(
    options: PaginationOptions
  ): Promise<Result<Pagination<BaseModel>>> {
    const result = await this.props.listRepository.list(options)
    return Result.ok(result)
  }
}
