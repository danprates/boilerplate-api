import { App, Dependencies, Domain } from '@/domain/protocols'
import { ApolloError, ApolloServer } from 'apollo-server-express'
import express, { Express, json, Request, Response } from 'express'
import { readdirSync } from 'fs'
import http from 'http'
import { join } from 'path'
import { serve, setup } from 'swagger-ui-express'
import { API_VERSION } from '../config/env.config'
import typeDefs from '../graphql'
import { docs } from '../swagger'

export default class ExpressAdapter implements App.Http {
  app: Express
  server: http.Server
  resolvers: any[] = []
  useCases: Domain.UseCase[] = []

  private constructor(private readonly container: Dependencies.Container) {
    this.app = express()
    this.app.disable('x-powered-by')
    this.app.use(json())
    this.cors('*')
    this.addSwagger('/docs')
    this.contentType('json')
  }

  static async init(
    container: Dependencies.Container
  ): Promise<ExpressAdapter> {
    const app = new ExpressAdapter(container)
    await app.initUseCases()
    app.setupRest()
    app.setupGraphql()
    return app
  }

  setupRest(): void {
    this.container.logger.debug('REST endpoints')
    this.useCases.forEach((useCase) => {
      const { method, route, description } = useCase.getMetaData()
      const url = `/api/v1${route}`

      this.container.logger.debug(`${method} ${url} -> ${description}`)
      this.app[method.toLocaleLowerCase()](url, this.useCaseToRoute(useCase))
    })
  }

  setupGraphql(): void {
    this.container.logger.debug('GraphQL endpoint -> /graphql')
    this.useCases.forEach((useCase) => {
      const { name, type } = useCase.getMetaData()
      this.resolvers.push({
        [type]: {
          [name]: this.useCaseToResolver(useCase)
        }
      })
    })

    const server = new ApolloServer({
      resolvers: this.resolvers,
      typeDefs,
      cache: 'bounded',
      context: ({ req }) => req
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
    return async (req: Request, res: Response) => {
      const { name } = useCase.getMetaData()

      try {
        this.container.logger.info('Started', null, name)

        const request = this.container.validation.check(req, name)
        useCase.isAuthorized(request)

        this.container.logger.debug('Request data:', request, name)
        const httpResponse = await useCase.execute(request)

        this.container.logger.info('Finished', null, name)
        res.status(httpResponse.statusCode).json(httpResponse.data)
      } catch (error) {
        const message = error.message || 'Server error'
        const status = error.code || 500
        this.container.logger.error(message, error, name)
        res.status(status).json({ message })
      }
    }
  }

  useCaseToResolver(useCase: Domain.UseCase): any {
    return async (parent, args, context, info) => {
      const { name } = useCase.getMetaData()

      try {
        this.container.logger.info('Started', null, name)
        const { headers = {} } = context
        const { query = {}, params = {}, body = {} } = args
        const httpRequest: Domain.Request = { query, params, body, headers }

        const request = this.container.validation.check(args, name)
        useCase.isAuthorized(request)

        this.container.logger.debug('Request data:', httpRequest, name)
        const result = await useCase.execute(request)

        if (result.statusCode < 400) {
          return result.data
        }

        this.container.logger.info('Finished', null, name)
        return new ApolloError(result.data.message, result.data.type)
      } catch (error) {
        const message = error.message || 'Server error'
        const code = error.name || 'SERVER_ERROR'
        this.container.logger.error(message, error, name)
        return new ApolloError(message, code)
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

  async initUseCases(): Promise<void> {
    const path = join(__dirname, '../../domain/use-cases')

    readdirSync(path).forEach(async (file) => {
      const validFile = !file.endsWith('.map')

      if (validFile) {
        const UseCase = (await import(`${path}/${file}`)).default
        this.useCases.push(new UseCase(this.container))
      }
    })

    return Promise.resolve()
  }
}
