import { Update } from '@/domain/usecases'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '@/presentation/protocols'

type Props = {
  usecase: Update
  validation: Validation
}

export class UpdateBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.props.validation.validate(request)

      if (validationResult.isFailure) {
        return badRequest(validationResult.error?.message)
      }

      const { params, body } = validationResult.getValue()

      const wasUpdated = await this.props.usecase.update(params.id, body)

      if (wasUpdated.isFailure) {
        return notFound()
      }

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
