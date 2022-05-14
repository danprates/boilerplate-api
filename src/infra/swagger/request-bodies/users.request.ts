import { OpenAPIV3 } from 'openapi-types'

export const userRequests: Pick<OpenAPIV3.ComponentsObject, 'requestBodies'> = {
  requestBodies: {
    CreateUser: {
      required: true,
      content: {
        'application/json': {
          schema: {
            required: ['name', 'email', 'password'],
            properties: {
              name: {
                type: 'string'
              },
              email: {
                type: 'string',
                format: 'email'
              },
              password: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    UpdateUser: {
      required: true,
      content: {
        'application/json': {
          schema: {
            properties: {
              name: {
                type: 'string'
              },
              email: {
                type: 'string',
                format: 'email'
              },
              password: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}
