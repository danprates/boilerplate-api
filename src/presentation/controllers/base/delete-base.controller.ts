import { Delete } from '@/domain/usecases'
import { badRequest, noContent, notFound } from '@/presentation/helpers'
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
    const validateResult = this.props.validation.validate(request)

    if (validateResult.isFailure && validateResult.error) {
      return badRequest(validateResult.error)
    }

    const { params } = validateResult.getValue()

    const wasDeleted = await this.props.usecase.delete(params.id)

    if (wasDeleted.isFailure) {
      return notFound()
    }

    return noContent()
  }
}
