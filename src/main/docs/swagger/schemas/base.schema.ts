import { OpenAPIV3 } from 'openapi-types'

export const BaseSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['id', 'createdAt', 'updatedAt'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    }
  }
}
