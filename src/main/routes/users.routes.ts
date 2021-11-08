import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express-route.adapter'
import { listUsersFactory } from '../factories/users'

export default (router: Router): void => {
  router.get('/users', expressRouteAdapter(listUsersFactory()))
}
