import { Result } from '@/application/models'

export interface Validation<T = any> {
  validate: (data: any) => Result<T>
}
