import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Logger,
  UpdateRepository,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  updateRepository: UpdateRepository
  logger: Logger
}

export class UpdateBaseController implements Controller {
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

      const { params, body } = validationResult.getValue()

      const wasUpdated = await this.props.updateRepository.update(
        params.id,
        body
      )

      if (wasUpdated.isFailure) {
        this.props.logger.warn('Repository returned an error')
        return resultErrorHandler(wasUpdated.error)
      }

      this.props.logger.info('Finished')
      return noContent()
    } catch (error) {
      this.props.logger.error(error.message, error)
      return serverError()
    }
  }
}
