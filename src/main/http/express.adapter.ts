import { Controller, HttpRequest } from '@/application/protocols'
import express, { Express, json, Request, Response } from 'express'
import http from 'http'
import { API_VERSION } from '../config/env.config'
import { Http } from './http.protocol'

export default class ExpressAdapter implements Http {
  app: Express
  server: http.Server

  constructor() {
    this.app = express()
    this.app.use(json())
  }

  on(method: string, url: string, factory: () => Controller): void {
    this.app[method](
      `/api/${API_VERSION}${url}`,
      this.controllerAdapter(factory())
    )
  }

  listen(port: number, callback?: any): void {
    this.server = this.app.listen(port)
    if (callback) callback()
  }

  close(callback?: any): void {
    this.server.close()
    if (callback) callback()
  }

  controllerAdapter(controller: Controller): any {
    return async (req: Request, res: Response) => {
      try {
        const httpRequest: HttpRequest = {
          body: req.body,
          params: req.params
        }

        if (req.query) {
          const { take, skip, ...query } = req.query

          httpRequest.query = {
            take: Number(req.query.take) || 10,
            skip: Number(req.query.skip) || 0,
            ...query
          }
        }

        const httpResponse = await controller.handler(httpRequest)

        res.status(httpResponse.statusCode).json(httpResponse.body)
      } catch (error) {
        res.status(500).json({ message: 'Server erro', code: error.name })
      }
    }
  }
}
