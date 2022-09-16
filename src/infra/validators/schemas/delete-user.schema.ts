import Joi from 'joi'
import BaseSchema from '../base-schema'

export default class DeleteUserSchema extends BaseSchema {
  constructor() {
    super('DeleteUser')
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      params: Joi.object({
        id: Joi.string().uuid().trim().required()
      })
    })
  }
}
