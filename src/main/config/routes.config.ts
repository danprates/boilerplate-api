import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { API_VERSION } from './env.config'

export const routesConfig = (app: Express): void => {
  const router = Router()
  app.use(`/api/${API_VERSION}`, router)
  // eslint-disable-next-line node/no-path-concat
  readdirSync(`${__dirname}/../routes`).forEach(async (file) => {
    if (!file.endsWith('.map') && !file.includes('.integration.ts')) {
      ;(await import(`../routes/${file}`)).default(router)
    }
  })
}
