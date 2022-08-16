import { Domain } from '@/application/protocols'
import { ApolloError } from 'apollo-server-express'

export const apolloServerAdapter =
  (useCase: Domain.UseCase) => async (parent, args, context, info) => {
    try {
      const { query = {}, params = {}, body = {}, headers = {} } = args
      const httpRequest: Domain.Request = { query, params, body, headers }

      const result = await useCase.execute(httpRequest)

      if (result.statusCode < 400) {
        return result.data
      }

      return new ApolloError(result.data.message, result.data.type)
    } catch (error) {
      console.error(error.stack)
      return new ApolloError('Server error', error.name)
    }
  }
