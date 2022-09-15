import { noContent } from '@/domain/helpers'
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
    await this.container.repository.update(request.params.id, request.body)
    return noContent()
  }
}
