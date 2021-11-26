import { OpenAPIV3 } from 'openapi-types'
import { PaginationSchema } from '../schemas/pagination.schema'

export const usersPath: OpenAPIV3.PathsObject = {
  '/users': {
    post: {
      description: 'Create an new user',
      tags: ['Users'],
      operationId: 'createUser',
      requestBody: {
        $ref: '#/components/requestBodies/CreateUser'
      },
      responses: {
        201: {
          description: 'Created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        500: {
          $ref: '#/components/responses/500'
        }
      }
    },
    get: {
      description: 'List all users',
      operationId: 'listUsers',
      tags: ['Users'],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: PaginationSchema.required,
                properties: {
                  ...PaginationSchema.properties,
                  data: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          }
        },
        empty: {
          $ref: '#/components/responses/emptyList'
        },
        500: {
          $ref: '#/components/responses/500'
        }
      }
    }
  },
  '/users/{id}': {
    get: {
      description: 'Find an user',
      operationId: 'findUser',
      parameters: [
        {
          $ref: '#/components/parameters/primaryKey'
        }
      ],
      tags: ['Users'],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        404: {
          $ref: '#/components/responses/404'
        },
        500: {
          $ref: '#/components/responses/500'
        }
      }
    },
    put: {
      description: 'Update an user',
      operationId: 'updateUser',
      parameters: [
        {
          $ref: '#/components/parameters/primaryKey'
        }
      ],
      tags: ['Users'],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateUser'
      },
      responses: {
        204: {
          $ref: '#/components/responses/204'
        },
        404: {
          $ref: '#/components/responses/404'
        },
        500: {
          $ref: '#/components/responses/500'
        }
      }
    },
    delete: {
      description: 'Delete an user',
      operationId: 'deleteUser',
      parameters: [
        {
          $ref: '#/components/parameters/primaryKey'
        }
      ],
      tags: ['Users'],
      responses: {
        204: {
          $ref: '#/components/responses/204'
        },
        404: {
          $ref: '#/components/responses/404'
        },
        500: {
          $ref: '#/components/responses/500'
        }
      }
    }
  }
}
