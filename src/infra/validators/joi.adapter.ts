import { ErrorModel, Result } from '@/application/models'
import { Domain, Validator } from '@/application/protocols'
import { readdirSync } from 'fs'
import Joi from 'joi'
import { join } from 'path'
import BaseSchema from './base-schema'

export class JoiAdapter implements Validator {
  private readonly schemas: BaseSchema[] = []
  constructor() {
    this.initSchemas()
  }

  check(data: Domain.Request, schemaName: string): Result<Domain.Request> {
    const schema = this.getSchema(schemaName)
    const { error, value } = schema.validate(data, { convert: true })

    if (error) {
      return Result.fail(ErrorModel.invalidParams(error.message))
    }

    return Result.ok(value)
  }

  getSchema(name: string): Joi.Schema {
    const schema = this.schemas.find((schema) => schema.name)
    if (!schema) throw new Error(`${name} schema not found`)
    return schema.getSchema()
  }

  initSchemas(): void {
    const path = join(__dirname, './schemas')

    readdirSync(path).forEach(async (file) => {
      const validFile = file.endsWith('.schema.ts')

      if (validFile) {
        const Schema = (await import(`${path}/${file}`)).default
        this.schemas.push(new Schema())
      }
    })
  }
}
