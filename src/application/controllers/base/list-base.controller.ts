import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  ListRepository,
  Logger,
  Validator
} from '@/application/protocols'

type Props = {
  listRepository: ListRepository
  validation: Validator
  logger: Logger
}

export class ListBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      this.props.logger.info('Started')
      this.props.logger.debug('Request data:', request)

      const validationResult = this.props.validation.run(request)
      if (validationResult.isFailure) {
        this.props.logger.warn('Request data is invalid')
        return resultErrorHandler(validationResult.error)
      }

      const { query } = validationResult.getValue()

      const result = await this.props.listRepository.list(query)
      if (result.isFailure) {
        this.props.logger.warn('Repository returned an error')
        return resultErrorHandler(result.error)
      }

      this.props.logger.info('Finished')
      return ok(result.getValue())
    } catch (error) {
      this.props.logger.error(error.message, error)
      return serverError()
    }
  }
}
