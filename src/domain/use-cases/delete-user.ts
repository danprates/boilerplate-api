import { Dependencies, Domain } from '@/domain/protocols'
import { Response } from '../entities/response'
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

  async execute(request: Domain.Request): Promise<Response> {
    await this.container.repository.softDelete(request.params.id)
    return Response.noContent()
  }
}
