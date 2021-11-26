import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/typedefs'

export const setupApolloServer = (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })

  server.start().then(() => {
    server.applyMiddleware({ app })
  })
}
