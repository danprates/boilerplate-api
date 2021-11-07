import { Delete } from '@/domain/usecases'
import { noContent, notFound } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class DeleteBaseController implements Controller {
  constructor (private readonly deleteUsecase: Delete) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const wasDeleted = await this.deleteUsecase.delete(request.params.id)

    if (!wasDeleted) {
      return notFound()
    }

    return noContent()
  }
}
