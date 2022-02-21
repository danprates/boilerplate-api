import { Result } from '@/application/models'

export interface Validator<T = any> {
  run: (data: any) => Result<T>
}
