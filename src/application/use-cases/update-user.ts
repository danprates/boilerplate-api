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
      route: '/users/:id',
      type: 'Mutation'
    }
  }

  isAuthorized(request: Domain.Request): boolean {
    return true
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
    try {
      this.container.logger.info('Started')
      this.container.logger.debug('Request data:', request)

      const wasUpdated = await this.container.repository.update(
        request.params.id,
        request.body
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
