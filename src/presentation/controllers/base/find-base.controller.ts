import { Find } from '@/domain/usecases'
import { badRequest, notFound, ok } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '@/presentation/protocols'

type Props = {
  usecase: Find
  validation: Validation
}

export class FindBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const validationResult = this.props.validation.validate(request)

    if (validationResult.isFailure && validationResult.error) {
      return badRequest(validationResult.error)
    }

    const { params } = validationResult.getValue()

    const result = await this.props.usecase.find(params.id)

    if (result.isFailure) {
      return notFound()
    }

    return ok(result.getValue())
  }
}
