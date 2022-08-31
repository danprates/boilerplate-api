import { ok, resultErrorHandler } from '@/domain/helpers'
import { Dependencies, Domain } from '@/domain/protocols'
import { UseCase } from '../protocols/use-case'

export default class ListUsers extends UseCase {
  constructor(private readonly container: Dependencies.Container) {
    super({
      name: 'ListUsers',
      description: 'List users',
      method: 'GET',
      route: '/users',
      type: 'Query'
    })
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
    const result = await this.container.repository.list(request.query)
    if (result.isFailure) {
      this.container.logger.warn('Repository returned an error')
      return resultErrorHandler(result.error)
    }

    return ok(result.getValue())
  }
}
