import { noContent, resultErrorHandler, serverError } from '@/domain/helpers'
import { Dependencies, Domain } from '@/domain/protocols'
import { UseCase } from '../protocols/use-case'

export default class UpdateUser extends UseCase {
  constructor(private readonly container: Dependencies.Container) {
    super({
      name: 'UpdateUser',
      description: 'Update user by id',
      method: 'PUT',
      route: '/users/:id',
      type: 'Mutation'
    })
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
