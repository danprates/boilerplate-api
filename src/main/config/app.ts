import express from 'express'
import { middlewaresConfig } from './middlewares.config'
import { routesConfig } from './routes.config'

const app = express()
middlewaresConfig(app)
routesConfig(app)

export default app
