import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import { ErrorModel } from '@/application/models'
import {
  Controller,
  FindRepository,
  HttpRequest,
  HttpResponse,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  findRepository: FindRepository
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

      const result = await this.props.findRepository.find(params.id)

      if (!result) {
        return resultErrorHandler(ErrorModel.notFound())
      }

      return ok(result)
    } catch (error) {
      return serverError()
    }
  }
}
