import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import { Dependencies, Domain } from '@/application/protocols'

export default class ListUsers implements Domain.UseCase {
  constructor(private readonly container: Dependencies.Container) {}

  getMetaData(): Domain.MetaData {
    return {
      name: 'ListUsers',
      description: 'List users',
      method: 'GET',
      route: '/users'
    }
  }

  isAuthorized(request: Domain.Request): boolean {
    return true
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
    try {
      this.container.logger.info('Started')
      this.container.logger.debug('Request data:', request)

      const validationResult = this.container.validation.run(request)
      if (validationResult.isFailure) {
        this.container.logger.warn('Request data is invalid')
        return resultErrorHandler(validationResult.error)
      }

      const { query } = validationResult.getValue()

      const result = await this.container.listRepository.list(query)
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
