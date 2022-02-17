import { List, Validation } from '@/application/protocols'
import { ok, resultErrorHandler, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

type Props = {
  usecase: List
  validation: Validation
}

export class ListBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.props.validation.validate(request)

      if (validationResult.isFailure) {
        return resultErrorHandler(validationResult.error)
      }

      const { query } = validationResult.getValue()

      const result = await this.props.usecase.list(query)

      return ok(result.getValue())
    } catch (error) {
      return serverError()
    }
  }
}
