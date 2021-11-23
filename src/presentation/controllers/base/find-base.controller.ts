import { Find } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers'
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
    try {
      const validationResult = this.props.validation.validate(request)

      if (validationResult.isFailure) {
        return badRequest(validationResult.error?.message)
      }

      const { params } = validationResult.getValue()

      const result = await this.props.usecase.find(params.id)

      if (result.isFailure) {
        return notFound()
      }

      return ok(result.getValue())
    } catch (error) {
      return serverError()
    }
  }
}
