import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Domain,
  ListRepository,
  Logger,
  Validator
} from '@/application/protocols'

type Props = {
  listRepository: ListRepository
  validation: Validator
  logger: Logger
}

export default class ListUsers implements Domain.UseCase {
  constructor(private readonly props: Props) {}

  getMetaData(): Domain.MetaData {
    return {
      name: 'ListUsers',
      description: 'List users',
      method: 'GET',
      route: '/users'
    }
  }

  isAuthorized(request: Domain.Request): boolean {
    return true
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
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
