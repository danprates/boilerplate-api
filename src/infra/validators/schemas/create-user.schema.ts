import Joi from 'joi'
import BaseSchema from '../base-schema'

export default class CreateUserSchema extends BaseSchema {
  constructor() {
    super('CreateUser')
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      params: Joi.object().allow(),
      query: Joi.object().allow(),
      body: Joi.object({
        name: Joi.string().required().trim().min(2).max(50),
        email: Joi.string().required().email().lowercase(),
        password: Joi.string().required().trim().min(6)
      })
    })
  }
}
