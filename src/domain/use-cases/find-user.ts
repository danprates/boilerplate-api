import { Dependencies, Domain } from '@/domain/protocols'
import { ErrorEntity } from '../entities'
import Response from '../entities/response'
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

  async execute(request: Domain.Request): Promise<Response> {
    const user = await this.container.repository.find(request.params.id)
    if (!user) throw ErrorEntity.notFound('User not found')
    return Response.ok(user)
  }
}
