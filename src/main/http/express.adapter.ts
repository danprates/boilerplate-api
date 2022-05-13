import express from 'express'
import { expressRouteAdapter } from '../adapters/express-route.adapter'
import { Http } from './http.protocol'

export default class ExpressAdapter implements Http {
  app: express.Express

  constructor() {
    this.app = express()
    this.app.use(express.json())
  }

  on(method: string, url: string, controller: any): void {
    this.app[method]('/api/v1' + url, expressRouteAdapter(controller()))
  }

  listen(port: number, callback: any): void {
    this.app.listen(port)
    callback()
  }
}
