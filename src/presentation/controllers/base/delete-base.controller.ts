import { Delete, Validation } from '@/application/protocols'
import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

type Props = {
  usecase: Delete
  validation: Validation
}

export class DeleteBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const validateResult = this.props.validation.validate(request)

      if (validateResult.isFailure) {
        return resultErrorHandler(validateResult.error)
      }

      const { params } = validateResult.getValue()

      const wasDeleted = await this.props.usecase.delete(params.id)

      if (wasDeleted.isFailure) {
        return resultErrorHandler(wasDeleted.error)
      }

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
