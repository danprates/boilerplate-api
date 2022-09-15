import { Dependencies, Domain } from '@/domain/protocols'
import Response from '../entities/response'
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

  async execute(request: Domain.Request): Promise<Response> {
    await this.container.repository.update(request.params.id, request.body)
    return Response.noContent()
  }
}
