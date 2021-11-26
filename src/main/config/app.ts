import express from 'express'
import { setupApolloServer } from './apollo-server'
import { middlewaresConfig } from './middlewares.config'
import { routesConfig } from './routes.config'
import { swaggerConfig } from './swagger.config'

const app = express()
swaggerConfig(app)
middlewaresConfig(app)
routesConfig(app)
setupApolloServer(app)

export default app
