import Joi from 'joi'
import BaseSchema from '../base-schema'

export default class ListUsersSchema extends BaseSchema {
  constructor() {
    super('ListUsers')
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      params: Joi.allow(),
      body: Joi.allow(),
      query: Joi.object({
        take: Joi.number().optional().default(10).min(1),
        skip: Joi.number().optional().default(0).min(0)
      })
    })
  }
}
