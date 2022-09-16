import Joi from 'joi'
import BaseSchema from '../base-schema'

export default class ListUsersSchema extends BaseSchema {
  constructor() {
    super('ListUsers')
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      query: Joi.object({
        take: Joi.number().optional().default(10).min(1).max(50),
        skip: Joi.number().optional().default(0).min(0)
      })
    })
  }
}
