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
  http.on('get', '/health', () => new HealthController(NODE_ENV))

  http.on('get', '/users', listUsersFactory)
  http.on('post', '/users', createUserFactory)
  http.on('get', '/users/:id', findUsersFactory)
  http.on('put', '/users/:id', updateUserFactory)
  http.on('delete', '/users/:id', deleteUserFactory)
}
