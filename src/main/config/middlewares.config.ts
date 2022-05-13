import { Express } from 'express'
import { contentType, cors } from '../middlewares'

export const middlewaresConfig = (app: Express): void => {
  app.use(cors)
  app.use(contentType)
}
