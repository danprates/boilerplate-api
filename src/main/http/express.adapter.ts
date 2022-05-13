import express from 'express'
import { Http } from './http.protocol'

export default class ExpressAdapter implements Http {
  app: express.Express

  constructor() {
    this.app = express()
    this.app.use(express.json())
  }

  on(method: string, url: string, callback: any): void {
    this.app[method](url, async (req: any, res: any) => {
      const output = await callback(req.params, req.body)
      res.json(output)
    })
  }

  listen(port: number): void {
    this.app.listen(port)
  }
}
