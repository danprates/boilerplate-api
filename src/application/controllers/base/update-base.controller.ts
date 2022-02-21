import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel } from '@/application/models'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  UpdateRepository,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  updateRepository: UpdateRepository
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

      const wasUpdated = await this.props.updateRepository.update(
        params.id,
        body
      )

      if (!wasUpdated) {
        return resultErrorHandler(ErrorModel.notFound())
      }

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
