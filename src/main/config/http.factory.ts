import ExpressAdapter from '../http/express.adapter'
import { Http } from '../http/http.protocol'
import { setupApolloServer } from './apollo-server'
import { routesConfig } from './routes.config'

export const httpFactory = (httpAdapter = new ExpressAdapter()): Http => {
  setupApolloServer(httpAdapter.app)
  routesConfig(httpAdapter)

  return httpAdapter
}
