import { Create } from '@/domain/usecases'
import { created } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class CreateBaseController implements Controller {
  constructor (private readonly usecase: Create) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const result = await this.usecase.create(request.body)

    return created(result)
  }
}
