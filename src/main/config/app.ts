import ExpressAdapter from '../http/express.adapter'
import healthRoutes from '../routes/health.routes'
import usersRoutes from '../routes/users.routes'
import { setupApolloServer } from './apollo-server'
import { middlewaresConfig } from './middlewares.config'

const expressAdapter = new ExpressAdapter()

// swaggerConfig(expressAdapter.app)
middlewaresConfig(expressAdapter.app)
setupApolloServer(expressAdapter.app)

usersRoutes(expressAdapter)
healthRoutes(expressAdapter)

export default expressAdapter.app
