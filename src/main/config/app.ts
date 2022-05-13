import ExpressAdapter from '../http/express.adapter'
import { setupApolloServer } from './apollo-server'
import { middlewaresConfig } from './middlewares.config'
import { routesConfig } from './routes.config'

const expressAdapter = new ExpressAdapter()

// swaggerConfig(expressAdapter.app)
middlewaresConfig(expressAdapter.app)
setupApolloServer(expressAdapter.app)

routesConfig(expressAdapter)

export default expressAdapter.app
