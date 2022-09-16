import { Dependencies, Domain } from '@/domain/protocols'
import { Response } from '../entities/response'
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

  async execute(request: Domain.Request): Promise<Response> {
    const user = await this.container.repository.create(request.body)
    return Response.created(user)
  }
}
