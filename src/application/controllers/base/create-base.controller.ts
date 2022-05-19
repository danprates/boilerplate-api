import { created, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Controller,
  CreateRepository,
  HttpRequest,
  HttpResponse,
  Logger,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  createRepository: CreateRepository
  logger: Logger
}

export class CreateBaseController implements Controller {
  constructor(private readonly props: Props) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      this.props.logger.info('Started')
      this.props.logger.debug('Request data:', request)

      const requestValidated = this.props.validation.run(request)
      if (requestValidated.isFailure) {
        this.props.logger.warn('Request data is invalid')
        return resultErrorHandler(requestValidated.error)
      }

      const { body } = requestValidated.getValue()

      const result = await this.props.createRepository.create(body)
      if (result.isFailure) {
        this.props.logger.warn('Repository returned an error')
        return resultErrorHandler(result.error)
      }

      this.props.logger.info('Finished')
      return created(result.getValue())
    } catch (error) {
      this.props.logger.error(error.message, error)
      return serverError()
    }
  }
}
