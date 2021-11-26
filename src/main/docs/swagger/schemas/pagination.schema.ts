import { OpenAPIV3 } from 'openapi-types'

export const PaginationSchema: OpenAPIV3.SchemaObject = {
  required: ['total', 'skip', 'take', 'data'],
  properties: {
    total: {
      type: 'integer',
      description: 'Total number of items',
      minimum: 0
    },
    skip: {
      type: 'integer',
      description: 'Number of items to skip',
      minimum: 0,
      default: 0
    },
    take: {
      type: 'integer',
      description: 'Number of items to take',
      minimum: 0,
      default: 10
    },
    data: {
      type: 'array',
      items: {},
      default: []
    }
  }
}
