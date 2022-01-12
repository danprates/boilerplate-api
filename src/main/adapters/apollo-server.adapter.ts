import { Controller, HttpRequest } from '@/presentation/protocols'
import { ApolloError } from 'apollo-server-express'

enum DEFAULT {
  TAKE = 10,
  SKIP = 0
}

export const apolloServerAdapter =
  (controller: Controller) => async (parent, args, context, info) => {
    try {
      const { query = {}, params = {}, body = {} } = args
      const httpRequest: HttpRequest = { query, params, body }

      if (args.query) {
        httpRequest.query = {
          take: Number(args?.pagination?.take) || DEFAULT.TAKE,
          skip: Number(args?.pagination?.skip) || DEFAULT.SKIP,
          ...args.query
        }
      } else {
        httpRequest.query = {
          take: DEFAULT.TAKE,
          skip: DEFAULT.SKIP
        }
      }

      const result = await controller.handler(httpRequest)

      if (result.statusCode < 400) {
        return result.body
      }

      throw new ApolloError(result.body.message, result.body.type)
    } catch (error) {
      console.error(error.stack)
      throw new ApolloError('Server error', error.name)
    }
  }
