import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { Dependencies, Domain } from '@/application/protocols'

export default class UpdateUser implements Domain.UseCase {
  constructor(private readonly container: Dependencies.Container) {}

  getMetaData(): Domain.MetaData {
    return {
      name: 'UpdateUser',
      description: 'Update user by id',
      method: 'PUT',
      route: '/users/:id'
    }
  }

  isAuthorized(request: Domain.Request): boolean {
    return true
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
    try {
      this.container.logger.info('Started')
      this.container.logger.debug('Request data:', request)

      const validationResult = this.container.validation.run(request)
      if (validationResult.isFailure) {
        this.container.logger.warn('Request data is invalid')
        return resultErrorHandler(validationResult.error)
      }

      const { params, body } = validationResult.getValue()

      const wasUpdated = await this.container.updateRepository.update(
        params.id,
        body
      )

      if (wasUpdated.isFailure) {
        this.container.logger.warn('Repository returned an error')
        return resultErrorHandler(wasUpdated.error)
      }

      this.container.logger.info('Finished')
      return noContent()
    } catch (error) {
      this.container.logger.error(error.message, error)
      return serverError()
    }
  }
}
