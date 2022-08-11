import Joi from 'joi'
import BaseSchema from '../base-schema'

export default class UpdateUserSchema extends BaseSchema {
  constructor() {
    super('UpdateUser')
  }

  getSchema(): Joi.Schema {
    return Joi.object({
      query: Joi.allow(),
      params: Joi.object({
        id: Joi.string().uuid().trim().required()
      }),
      body: Joi.object({
        name: Joi.string().optional().trim().min(2).max(50),
        email: Joi.string().optional().email().lowercase(),
        password: Joi.string().optional().trim().min(6)
      })
    })
  }
}
