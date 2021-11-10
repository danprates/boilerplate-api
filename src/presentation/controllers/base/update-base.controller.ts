import { Update } from '@/domain/usecases'
import { badRequest, noContent, notFound } from '@/presentation/helpers'
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
    const validationResult = this.props.validation.validate(request)

    if (validationResult.isFailure && validationResult.error) {
      return badRequest(validationResult.error)
    }

    const { params, body } = validationResult.getValue()

    const wasUpdated = await this.props.usecase.update(params.id, body)

    if (wasUpdated.isFailure) {
      return notFound()
    }

    return noContent()
  }
}
