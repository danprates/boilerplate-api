import { Result } from '@/domain/models'
import { Validation } from '@/presentation/protocols'
import Joi from 'joi'

export class JoiAdapter<T = any> implements Validation {
  constructor (private readonly schema: Joi.Schema) {}

  validate (data: any): Result<T> {
    const { error, value } = this.schema.validate(data, { convert: true })

    if (error) {
      return Result.fail(error.message)
    }

    return Result.ok(value)
  }
}
