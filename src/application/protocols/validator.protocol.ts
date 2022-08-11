import { Result } from '@/application/models'
import { Domain } from './domain.protocol'

export interface Validator {
  check: (data: Domain.Request, schemaName: string) => Result<Domain.Request>
}
