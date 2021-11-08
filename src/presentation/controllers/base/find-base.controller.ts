import { Find } from '@/domain/usecases'
import { notFound, ok } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class FindBaseController implements Controller {
  constructor (private readonly findUsecase: Find) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const result = await this.findUsecase.find(request.params.id)

    if (result.isFailure) {
      return notFound()
    }

    return ok(result.getValue())
  }
}
