import { Delete } from '@/domain/usecases'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '@/presentation/protocols'

type Props = {
  usecase: Delete
  validation: Validation
}

export class DeleteBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    try {
      const validateResult = this.props.validation.validate(request)

      if (validateResult.isFailure) {
        return badRequest(validateResult.error?.message)
      }

      const { params } = validateResult.getValue()

      const wasDeleted = await this.props.usecase.delete(params.id)

      if (wasDeleted.isFailure) {
        return notFound()
      }

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
