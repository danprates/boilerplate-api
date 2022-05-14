import ExpressAdapter from '../http/express.adapter'
import { Http } from '../http/http.protocol'
import { setupApolloServer } from './apollo-server'
import { middlewaresConfig } from './middlewares.config'
import { routesConfig } from './routes.config'
import { swaggerConfig } from './swagger.config'

export const httpFactory = (httpAdapter = new ExpressAdapter()): Http => {
  swaggerConfig(httpAdapter.app)
  middlewaresConfig(httpAdapter.app)
  setupApolloServer(httpAdapter.app)
  routesConfig(httpAdapter)

  return httpAdapter
}
