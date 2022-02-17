import { created, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Controller,
  Create,
  HttpRequest,
  HttpResponse,
  Validator
} from '@/application/protocols'

type Props = {
  usecase: Create
  validation: Validator
}

export class CreateBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const requestValidated = this.props.validation.run(request)

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
