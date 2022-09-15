import { ok } from '@/domain/helpers'
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
    const users = await this.container.repository.list(request.query)
    return ok(users)
  }
}
