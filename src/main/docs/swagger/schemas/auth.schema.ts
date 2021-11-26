import { OpenAPIV3 } from 'openapi-types'
import { BaseSchema } from './base.schema'

export const AuthSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['email', 'password', ...(BaseSchema.required ?? '')],
  properties: {
    ...BaseSchema.properties,
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      writeOnly: true
    }
  }
}
