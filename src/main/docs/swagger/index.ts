import { OpenAPIV3 } from 'openapi-types'
import { primaryKeyParameter } from './parameters'
import { usersPath } from './paths'
import { userRequests } from './request-bodies'
import { errorResponses, successResponses } from './responses'
import { UserSchema } from './schemas'

export const docs: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Boilerplate API',
    description: 'A simple boilerplate to create an API',
    version: '1.0.0'
  },
  tags: [
    {
      name: 'Users'
    }
  ],
  components: {
    schemas: {
      User: UserSchema
    },
    requestBodies: {
      ...userRequests.requestBodies
    },
    responses: {
      ...errorResponses,
      ...successResponses
    },
    parameters: {
      primaryKey: primaryKeyParameter
    }
  },
  paths: {
    ...usersPath
  }
}
