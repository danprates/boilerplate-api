import { Controller, HttpRequest } from '@/presentation/protocols.presentation'
import { ApolloError } from 'apollo-server-express'

enum DEFAULT {
  TAKE = 10,
  SKIP = 0
}

// TODO: tipar os parametros do apollo
// TODO: criar testes unitário pra esse adapter
export const apolloServerAdapter =
  (controller: Controller) => async (parent, args, context, info) => {
    try {
      const { query = {}, params = {}, body = {} } = args
      const httpRequest: HttpRequest = { query, params, body }

      if (args.query) {
        httpRequest.query = {
          pagination: {
            take: Number(args?.pagination?.take) || DEFAULT.TAKE,
            skip: Number(args?.pagination?.skip) || DEFAULT.SKIP
          },
          query: { ...args.query }
        }
      } else {
        httpRequest.query = {
          pagination: {
            take: DEFAULT.TAKE,
            skip: DEFAULT.SKIP
          },
          query: {}
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
