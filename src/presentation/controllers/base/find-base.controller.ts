import { Find } from '@/domain/usecases'
import { notFound, ok } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

type Props = {
  usecase: Find
}

export class FindBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const result = await this.props.usecase.find(request.params.id)

    if (result.isFailure) {
      return notFound()
    }

    return ok(result.getValue())
  }
}
