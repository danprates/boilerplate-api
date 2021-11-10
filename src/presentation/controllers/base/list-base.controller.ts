import { List } from '@/domain/usecases'
import { badRequest, ok } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '@/presentation/protocols'

type Props = {
  usecase: List
  validation: Validation
}

export class ListBaseController implements Controller {
  constructor (private readonly props: Props) {}

  async handler (request: HttpRequest): Promise<HttpResponse> {
    const validationResult = this.props.validation.validate(request)

    if (validationResult.isFailure && validationResult.error) {
      return badRequest(validationResult.error)
    }

    const { query } = validationResult.getValue()

    const result = await this.props.usecase.list(query)

    return ok(result.getValue())
  }
}
