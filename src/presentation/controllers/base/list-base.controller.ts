import { List } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers'
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
    try {
      const validationResult = this.props.validation.validate(request)

      if (validationResult.isFailure) {
        return badRequest(validationResult.error)
      }

      const { query } = validationResult.getValue()

      const result = await this.props.usecase.list(query)

      return ok(result.getValue())
    } catch (error) {
      return serverError(error)
    }
  }
}
