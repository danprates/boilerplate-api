import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Controller,
  Find,
  HttpRequest,
  HttpResponse,
  Validator
} from '@/application/protocols'

type Props = {
  usecase: Find
  validation: Validator
}

export class FindBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.props.validation.run(request)

      if (validationResult.isFailure) {
        return resultErrorHandler(validationResult.error)
      }

      const { params } = validationResult.getValue()

      const result = await this.props.usecase.find(params.id)

      if (result.isFailure) {
        return resultErrorHandler(result.error)
      }

      return ok(result.getValue())
    } catch (error) {
      return serverError()
    }
  }
}