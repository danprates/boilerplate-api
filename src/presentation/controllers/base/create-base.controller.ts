import { Create } from '@/domain/protocols'
import {
  created,
  resultErrorHandler,
  serverError
} from '@/presentation/helpers'
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
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const requestValidated = this.props.validation.validate(request)

      if (requestValidated.isFailure) {
        return resultErrorHandler(requestValidated.error)
      }
      const { body } = requestValidated.getValue()

      const result = await this.props.usecase.create(body)

      return created(result.getValue())
    } catch (error) {
      return serverError()
    }
  }
}
