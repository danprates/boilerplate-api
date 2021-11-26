import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { docs } from '../docs/swagger'
import { noCache } from '../middlewares/no-cache.middleware'
import { API_VERSION } from './env.config'

export const swaggerConfig = (app: Express): void => {
  app.use(`/api/${API_VERSION}/docs`, noCache, serve, setup(docs))
}
