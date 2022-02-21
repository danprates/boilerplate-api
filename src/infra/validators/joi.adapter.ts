import { ErrorModel, Result } from '@/application/models'
import { Validator } from '@/application/protocols'
import Joi from 'joi'

export class JoiAdapter<T = any> implements Validator {
  constructor(private readonly schema: Joi.Schema) {}

  run(data: any): Result<T> {
    const { error, value } = this.schema.validate(data, { convert: true })

    if (error) {
      return Result.fail(ErrorModel.invalidParams(error.message))
    }

    return Result.ok(value)
  }
}
