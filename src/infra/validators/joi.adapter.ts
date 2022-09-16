import { ErrorEntity } from '@/domain/entities'
import { Dependencies, Domain } from '@/domain/protocols'
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

  check(data: Domain.Request, schemaName: string): Domain.Request {
    const schema = this.getSchema(schemaName)
    const { error, value } = schema.validate(data, {
      convert: true,
      allowUnknown: true,
      abortEarly: false
    })

    if (error) {
      throw ErrorEntity.invalidParams(error.message)
    }

    return value
  }

  getSchema(name: string): Joi.Schema {
    const schema = this.schemas.find((schema) => schema.name === name)
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
