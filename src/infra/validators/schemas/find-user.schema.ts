import Joi from 'joi'
import BaseSchema from '../base-schema'

export default class FindUserSchema extends BaseSchema {
  constructor() {
    super('FindUser')
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      body: Joi.allow(),
      query: Joi.allow(),
      params: Joi.object({
        id: Joi.string().uuid().trim().required()
      })
    })
  }
}
