import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  ListRepository,
  Validator
} from '@/application/protocols'

type Props = {
  listRepository: ListRepository
  validation: Validator
}

export class ListBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.props.validation.run(request)

      if (validationResult.isFailure) {
        return resultErrorHandler(validationResult.error)
      }

      const { query } = validationResult.getValue()

      const result = await this.props.listRepository.list(query)

      return ok(result)
    } catch (error) {
      return serverError()
    }
  }
}
