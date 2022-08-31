import { noContent, resultErrorHandler } from '@/domain/helpers'
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
    const wasUpdated = await this.container.repository.update(
      request.params.id,
      request.body
    )

    if (wasUpdated.isFailure) {
      this.container.logger.warn('Repository returned an error')
      return resultErrorHandler(wasUpdated.error)
    }

    return noContent()
  }
}
