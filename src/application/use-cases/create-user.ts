import { created, resultErrorHandler, serverError } from '@/application/helpers'
import {
  CreateRepository,
  Domain,
  Logger,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  createRepository: CreateRepository
  logger: Logger
}

export default class CreateUser implements Domain.UseCase {
  constructor(private readonly props: Props) {}
  getMetaData(): Domain.MetaData {
    return {
      name: 'CreateUser',
      description: 'Create a new user',
      method: 'POST',
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
