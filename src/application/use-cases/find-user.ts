import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import { Dependencies, Domain } from '@/application/protocols'

export default class FindUser implements Domain.UseCase {
  constructor(private readonly container: Dependencies.Container) {}
  getMetaData(): Domain.MetaData {
    return {
      name: 'FindUser',
      description: 'Find user by id',
      method: 'GET',
      route: '/users/:id'
    }
  }

  isAuthorized(request: Domain.Request): boolean {
    return true
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
    try {
      this.container.logger.info('Started')
      this.container.logger.debug('Request data:', request)

      const result = await this.container.repository.find(request.params.id)
      if (result.isFailure) {
        this.container.logger.warn('Repository returned an error')
        return resultErrorHandler(result.error)
      }

      this.container.logger.info('Finished')
      return ok(result.getValue())
    } catch (error) {
      this.container.logger.error(error.message, error)
      return serverError()
    }
  }
}
