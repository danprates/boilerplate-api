import { Controller, HttpRequest, HttpResponse } from '@/application/protocols'
import {
  createUserFactory,
  deleteUserFactory,
  findUsersFactory,
  listUsersFactory,
  updateUserFactory
} from '../factories/users'
import { Http } from '../http/http.protocol'
import { NODE_ENV } from './env.config'

class HealthController implements Controller {
  async handler(request: HttpRequest<unknown>): Promise<HttpResponse> {
    return Promise.resolve({
      statusCode: 200,
      body: { message: `App is running in ${NODE_ENV} mode` }
    })
  }
}

export const routesConfig = (http: Http): void => {
  http.on('get', '/health', () => new HealthController())

  http.on('get', '/users', listUsersFactory)
  http.on('post', '/users', createUserFactory)
  http.on('get', '/users/:id', findUsersFactory)
  http.on('put', '/users/:id', updateUserFactory)
  http.on('delete', '/users/:id', deleteUserFactory)
}
