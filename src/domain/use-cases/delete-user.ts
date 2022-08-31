import { ErrorEntity } from '@/domain/entities'
import { noContent, resultErrorHandler, serverError } from '@/domain/helpers'
import { Dependencies, Domain } from '@/domain/protocols'
import { UseCase } from '../protocols/use-case'

export default class DeleteUser extends UseCase {
  constructor(private readonly container: Dependencies.Container) {
    super({
      name: 'DeleteUser',
      description: 'Delete a user',
      method: 'DELETE',
      route: '/users/:id',
      type: 'Mutation'
    })
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
        return resultErrorHandler(ErrorEntity.notFound())
      }

      this.container.logger.info('Finished')
      return noContent()
    } catch (error) {
      this.container.logger.error(error.message, error)
      return serverError()
    }
  }
}
