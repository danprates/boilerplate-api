import { noContent } from '@/domain/helpers'
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
    await this.container.repository.softDelete(request.params.id)
    return noContent()
  }
}
