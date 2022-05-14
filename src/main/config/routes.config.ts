import HealthController from '@/application/controllers/health.controller'
import {
  createUserFactory,
  deleteUserFactory,
  findUsersFactory,
  listUsersFactory,
  updateUserFactory
} from '../factories/users'
import { Http } from '../http/http.protocol'
import { NODE_ENV } from './env.config'

export const routesConfig = (http: Http): void => {
  http.addRoute('get', '/health', () => new HealthController(NODE_ENV))

  http.addRoute('get', '/users', listUsersFactory)
  http.addRoute('post', '/users', createUserFactory)
  http.addRoute('get', '/users/:id', findUsersFactory)
  http.addRoute('put', '/users/:id', updateUserFactory)
  http.addRoute('delete', '/users/:id', deleteUserFactory)
}
