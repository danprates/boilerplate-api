import { Response } from '../entities/response'
import { Domain } from './domain.protocol'

export abstract class UseCase implements Domain.UseCase {
  constructor(private readonly props: Domain.MetaData) {}
  getMetaData(): Domain.MetaData {
    return this.props
  }

  isAuthorized(request: Domain.Request): void {
    // put the default auth logic here
  }

  async execute(request: Domain.Request): Promise<Response> {
    throw new Error('Method not implemented')
  }
}
