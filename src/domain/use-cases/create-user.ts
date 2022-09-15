import { created } from '@/domain/helpers'
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
    const user = await this.container.repository.create(request.body)
    return created(user)
  }
}
