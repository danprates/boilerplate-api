import { ErrorModel, Result } from '@/application/models'
import { Dependencies, Domain } from '@/application/protocols'
import { readdirSync } from 'fs'
import Joi from 'joi'
import { join } from 'path'
import BaseSchema from './base-schema'

export class JoiAdapter implements Dependencies.Validator {
  private readonly schemas: BaseSchema[] = []

  private constructor() {}

  static async init(): Promise<JoiAdapter> {
    const joiAdapter = new JoiAdapter()
    await joiAdapter.initSchemas()
    return joiAdapter
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

  addSchema(schema: BaseSchema): void {
    this.schemas.push(schema)
  }

  private async initSchemas(): Promise<void> {
    const path = join(__dirname, './schemas')

    readdirSync(path).forEach(async (file) => {
      const validFile = file.endsWith('.schema.ts')

      if (validFile) {
        const Schema = (await import(`${path}/${file}`)).default
        this.schemas.push(new Schema())
      }
    })

    return Promise.resolve()
  }
}
