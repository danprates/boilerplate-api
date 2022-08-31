import { created, resultErrorHandler, serverError } from '@/domain/helpers'
import { Dependencies, Domain } from '@/domain/protocols'
import { UseCase } from '../protocols/use-case'

export default class CreateUser extends UseCase {
  constructor(private readonly container: Dependencies.Container) {
    super({
      name: 'CreateUser',
      description: 'Create a new user',
      method: 'POST',
      route: '/users',
      type: 'Mutation'
    })
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
    try {
      const result = await this.container.repository.create(request.body)
      if (result.isFailure) {
        this.container.logger.warn('Repository returned an error')
        return resultErrorHandler(result.error)
      }

      return created(result.getValue())
    } catch (error) {
      this.container.logger.error(error.message, error)
      return serverError()
    }
  }
}
