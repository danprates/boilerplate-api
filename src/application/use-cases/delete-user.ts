import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel } from '@/application/models'
import { Dependencies, Domain } from '@/application/protocols'

export default class DeleteUser implements Domain.UseCase {
  constructor(private readonly container: Dependencies.Container) {}
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
      this.container.logger.info('Started')
      this.container.logger.debug('Request data:', request)

      const wasDeleted = await this.container.repository.softDelete(
        request.params.id
      )
      if (wasDeleted.isFailure) {
        this.container.logger.warn('Repository returned an error')
        return resultErrorHandler(ErrorModel.notFound())
      }

      this.container.logger.info('Finished')
      return noContent()
    } catch (error) {
      this.container.logger.error(error.message, error)
      return serverError()
    }
  }
}
