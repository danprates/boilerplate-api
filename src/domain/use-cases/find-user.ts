import { ok, resultErrorHandler } from '@/domain/helpers'
import { Dependencies, Domain } from '@/domain/protocols'
import { UseCase } from '../protocols/use-case'

export default class FindUser extends UseCase {
  constructor(private readonly container: Dependencies.Container) {
    super({
      name: 'FindUser',
      description: 'Find user by id',
      method: 'GET',
      route: '/users/:id',
      type: 'Query'
    })
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
    const result = await this.container.repository.find(request.params.id)
    if (result.isFailure) {
      this.container.logger.warn('Repository returned an error')
      return resultErrorHandler(result.error)
    }

    return ok(result.getValue())
  }
}
