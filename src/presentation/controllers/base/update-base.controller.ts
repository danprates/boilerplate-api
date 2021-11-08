import { Update } from '@/domain/usecases'
import { noContent, notFound } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class UpdateBaseController implements Controller {
  constructor (private readonly updateUsecase: Update) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const wasUpdated = await this.updateUsecase.update(request.params.id, request.body)

    if (wasUpdated.isFailure) {
      return notFound()
    }

    return noContent()
  }
}
