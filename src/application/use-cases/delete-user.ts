import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel } from '@/application/models'
import {
  Domain,
  HardDeleteRepository,
  Logger,
  SoftDeleteRepository,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  deleteRepository: HardDeleteRepository | SoftDeleteRepository
  logger: Logger
}

export default class DeleteUser implements Domain.UseCase {
  constructor(private readonly props: Props) {}
  getMetaData(): Domain.MetaData {
    return {
      name: 'DeleteUser',
      description: 'Delete a user',
      method: 'DELETE',
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

      const validateResult = this.props.validation.run(request)
      if (validateResult.isFailure) {
        this.props.logger.warn('Request data is invalid')
        return resultErrorHandler(validateResult.error)
      }

      const { params } = validateResult.getValue()

      const wasDeleted = await this.props.deleteRepository.delete(params.id)
      if (wasDeleted.isFailure) {
        this.props.logger.warn('Repository returned an error')
        return resultErrorHandler(ErrorModel.notFound())
      }

      this.props.logger.info('Finished')
      return noContent()
    } catch (error) {
      this.props.logger.error(error.message, error)
      return serverError()
    }
  }
}
