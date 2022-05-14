import { OpenAPIV3 } from 'openapi-types'
import { AuthSchema } from './auth.schema'

export const UserSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['name', 'email', ...(AuthSchema.required ?? '')],
  properties: {
    ...AuthSchema.properties,
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    }
  }
}
