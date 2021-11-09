import { Result } from '@/domain/models'

export interface Validation<T = any> {
  validate: (data: any) => Result<T>
}
