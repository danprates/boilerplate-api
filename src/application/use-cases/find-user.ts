import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Domain,
  FindRepository,
  Logger,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  findRepository: FindRepository
  logger: Logger
}

export default class FindUser implements Domain.UseCase {
  constructor(private readonly props: Props) {}
  getMetaData(): Domain.MetaData {
    return {
      name: 'FindUser',
      description: 'Find user by id',
      method: 'GET',
      route: '/users/:id'
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

      const { params } = validationResult.getValue()

      const result = await this.props.findRepository.find(params.id)
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
