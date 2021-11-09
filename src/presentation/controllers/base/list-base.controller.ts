import { List } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

type Props = {
  usecase: List
}

export class ListBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler ({ query }: HttpRequest): Promise<HttpResponse> {
    const result = await this.props.usecase.list(query)

    return ok(result.getValue())
  }
}
