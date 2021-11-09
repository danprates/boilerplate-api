import { Update } from '@/domain/usecases'
import { noContent, notFound } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

type Props = {
  usecase: Update
}

export class UpdateBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const wasUpdated = await this.props.usecase.update(request.params.id, request.body)

    if (wasUpdated.isFailure) {
      return notFound()
    }

    return noContent()
  }
}
