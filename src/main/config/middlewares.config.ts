import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser.middleware'
import { cors } from '../middlewares/cors.middleware'

export const middlewaresConfig = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
