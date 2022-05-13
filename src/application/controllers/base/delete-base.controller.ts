import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel } from '@/application/models'
import {
  Controller,
  HardDeleteRepository,
  HttpRequest,
  HttpResponse,
  SoftDeleteRepository,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  deleteRepository: HardDeleteRepository | SoftDeleteRepository
}

export class DeleteBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const validateResult = this.props.validation.run(request)

      if (validateResult.isFailure) {
        return resultErrorHandler(validateResult.error)
      }

      const { params } = validateResult.getValue()

      const wasDeleted = await this.props.deleteRepository.delete(params.id)

      if (wasDeleted.isFailure) {
        return resultErrorHandler(ErrorModel.notFound())
      }

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
