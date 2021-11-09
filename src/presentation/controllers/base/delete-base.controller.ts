import { Delete } from '@/domain/usecases'
import { noContent, notFound } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

type Props = {
  usecase: Delete
}

export class DeleteBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const wasDeleted = await this.props.usecase.delete(request.params.id)

    if (wasDeleted.isFailure) {
      return notFound()
    }

    return noContent()
  }
}
