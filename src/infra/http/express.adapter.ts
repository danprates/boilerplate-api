import { Controller, HttpRequest } from '@/application/protocols'
import { ApolloServer } from 'apollo-server-express'
import express, { Express, json, Request, Response } from 'express'
import http from 'http'
import { serve, setup } from 'swagger-ui-express'
import { API_VERSION } from '../config/env.config'
import { routesConfig } from '../config/routes.config'
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/typedefs'
import { docs } from '../swagger'
import { Http } from './http.protocol'

export default class ExpressAdapter implements Http {
  app: Express
  server: http.Server

  constructor() {
    this.app = express()
    this.app.disable('x-powered-by')
    this.app.use(json())
    this.cors('*')
    this.addSwagger('/docs')
    this.contentType('json')
    this.setupGraphql()
    routesConfig(this)
  }

  addRoute(method: string, url: string, factory: () => Controller): void {
    this.app[method](
      `/api/${API_VERSION}${url}`,
      this.controllerAdapter(factory())
    )
  }

  setupGraphql(): void {
    const server = new ApolloServer({
      resolvers,
      typeDefs
    })

    server.start().then(() => {
      server.applyMiddleware({ app: this.app })
    })
  }

  listen(port: number, callback?: any): void {
    this.server = this.app.listen(port)
    if (callback) callback()
  }

  close(callback?: any): void {
    this.server.close()
    if (callback) callback()
  }

  cors(origin: string): void {
    this.app.use((req, res, next) => {
      res.set('access-control-allow-origin', origin)
      res.set('access-control-allow-headers', origin)
      res.set('access-control-allow-methods', origin)
      next()
    })
  }

  contentType(type: string): void {
    this.app.use((req, res, next) => {
      res.type(type)
      next()
    })
  }

  addSwagger(path: string): void {
    this.app.use(`/api/${API_VERSION}${path}`, this.noCache, serve, setup(docs))
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

  private noCache(req, res, next): void {
    res.set(
      'cache-control',
      'no-cache, no-store, must-revalidate, proxy-validate'
    )
    res.set('pragma', 'no-cache')
    res.set('expires', '0')
    res.set('surrogate-control', 'no-store')
    next()
  }
}
