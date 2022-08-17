import { App, Domain } from '@/application/protocols'
import { ApolloError, ApolloServer } from 'apollo-server-express'
import express, { Express, json, Request, Response } from 'express'
import http from 'http'
import { serve, setup } from 'swagger-ui-express'
import { API_VERSION } from '../config/env.config'
import typeDefs from '../graphql/typedefs'
import { docs } from '../swagger'

export default class ExpressAdapter implements App.Http {
  app: Express
  server: http.Server
  resolvers: any[] = []

  constructor() {
    this.app = express()
    this.app.disable('x-powered-by')
    this.app.use(json())
    this.cors('*')
    this.addSwagger('/docs')
    this.contentType('json')
    this.setupGraphql()
    // routesConfig(this)
  }

  addRoute(method: string, url: string, useCase: Domain.UseCase): void {
    this.app[method.toLocaleLowerCase()](url, this.useCaseToRoute(useCase))
  }

  addResolver(useCase: Domain.UseCase): void {
    const { name, type } = useCase.getMetaData()
    this.resolvers.push({
      [type]: {
        [name]: this.useCaseToResolver(useCase)
      }
    })
  }

  setupGraphql(): void {
    const server = new ApolloServer({
      resolvers: this.resolvers,
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

  useCaseToRoute(useCase: Domain.UseCase): any {
    return async ({ body, query, params, headers }: Request, res: Response) => {
      try {
        const request: Domain.Request = { body, query, params, headers }

        if (!useCase.isAuthorized(request))
          return res.status(403).json({ message: 'Unauthorized' })

        const httpResponse = await useCase.execute(request)

        res.status(httpResponse.statusCode).json(httpResponse.data)
      } catch (error) {
        res.status(500).json({ message: 'Server erro', code: error.name })
      }
    }
  }

  useCaseToResolver(useCase: Domain.UseCase): any {
    return async (parent, args, context, info) => {
      try {
        const { query = {}, params = {}, body = {}, headers = {} } = args
        const httpRequest: Domain.Request = { query, params, body, headers }

        const result = await useCase.execute(httpRequest)

        if (result.statusCode < 400) {
          return result.data
        }

        return new ApolloError(result.data.message, result.data.type)
      } catch (error) {
        console.error(error.stack)
        return new ApolloError('Server error', error.name)
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
