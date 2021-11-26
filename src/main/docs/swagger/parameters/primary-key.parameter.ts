import { OpenAPIV3 } from 'openapi-types'

export const primaryKeyParameter: OpenAPIV3.ParameterObject = {
  name: 'id',
  in: 'path',
  required: true,
  schema: {
    type: 'string',
    format: 'uuid'
  }
}
