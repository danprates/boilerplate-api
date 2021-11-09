import { Create } from '@/domain/usecases'
import { created } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

type Props = {
  usecase: Create
}

export class CreateBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const result = await this.props.usecase.create(request.body)

    return created(result.getValue())
  }
}
