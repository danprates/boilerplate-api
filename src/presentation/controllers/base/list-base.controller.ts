import { List } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class ListBaseController implements Controller {
  constructor (private readonly listUsecase: List) {}

  async handler ({ query }: HttpRequest): Promise<HttpResponse> {
    const result = await this.listUsecase.list(query)

    return ok(result.getValue())
  }
}
