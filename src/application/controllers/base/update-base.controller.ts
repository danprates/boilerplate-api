import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Update,
  Validator
} from '@/application/protocols'

type Props = {
  usecase: Update
  validation: Validator
}

export class UpdateBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.props.validation.run(request)

      if (validationResult.isFailure) {
        return resultErrorHandler(validationResult.error)
      }

      const { params, body } = validationResult.getValue()

      const wasUpdated = await this.props.usecase.update(params.id, body)

      if (wasUpdated.isFailure) {
        return resultErrorHandler(wasUpdated.error)
      }

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}