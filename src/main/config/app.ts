import ExpressAdapter from '../http/express.adapter'
import { setupApolloServer } from './apollo-server'
import { middlewaresConfig } from './middlewares.config'
import { routesConfig } from './routes.config'
import { swaggerConfig } from './swagger.config'

const expressAdapter = new ExpressAdapter()
const app = expressAdapter.app
swaggerConfig(app)
middlewaresConfig(app)
routesConfig(app)
setupApolloServer(app)

export default app
