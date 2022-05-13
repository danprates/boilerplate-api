import {
  createUserFactory,
  deleteUserFactory,
  findUsersFactory,
  listUsersFactory,
  updateUserFactory
} from '../factories/users'
import { Http } from '../http/http.protocol'

export default (http: Http): void => {
  http.on('get', '/users', listUsersFactory)
  http.on('post', '/users', createUserFactory)
  http.on('get', '/users/:id', findUsersFactory)
  http.on('put', '/users/:id', updateUserFactory)
  http.on('delete', '/users/:id', deleteUserFactory)
}
