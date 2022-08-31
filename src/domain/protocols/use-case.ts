import { Domain } from './domain.protocol'

export abstract class UseCase implements Domain.UseCase {
  constructor(private readonly props: Domain.MetaData) {}
  getMetaData(): Domain.MetaData {
    return this.props
  }

  isAuthorized(request: Domain.Request): boolean {
    return true
  }

  async execute(request: Domain.Request): Promise<Domain.Response> {
    throw new Error('Method not implemented')
  }
}
