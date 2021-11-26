import { OpenAPIV3 } from 'openapi-types'

export const successResponses: OpenAPIV3.ResponsesObject = {
  emptyList: {
    description: 'Empty result',
    content: {
      'application/json': {
        schema: {
          type: 'object',
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
      }
    }
  },
  204: {
    description: 'Success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          nullable: true,
          default: null
        }
      }
    }
  }
}
