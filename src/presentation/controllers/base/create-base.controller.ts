import { Create } from '@/domain/usecases'
import { badRequest, created } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '@/presentation/protocols'

type Props = {
  usecase: Create
  validation: Validation
}

export class CreateBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const requestValidated = this.props.validation.validate(request)

    if (requestValidated.isFailure && requestValidated.error) {
      return badRequest(requestValidated.error)
    }
    const { body } = requestValidated.getValue()

    const result = await this.props.usecase.create(body)

    return created(result.getValue())
  }
}
