import { OpenAPIV3 } from 'openapi-types'

const errorSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['message'],
  properties: {
    message: {
      type: 'string'
    }
  }
}

export const errorResponses: OpenAPIV3.ResponsesObject = {
  404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: { ...errorSchema, default: { message: 'Resource Not found' } }
      }
    }
  },
  500: {
    description: 'Server error',
    content: {
      'application/json': {
        schema: { ...errorSchema, default: { message: 'Server error' } }
      }
    }
  }
}
