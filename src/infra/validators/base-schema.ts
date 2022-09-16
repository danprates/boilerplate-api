import Joi from 'joi'

export default abstract class BaseSchema {
  constructor(readonly name: string) {}

  getSchema(): Joi.Schema {
    throw new Error('Method not implemented')
  }
}
