import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express-route.adapter'
import { createUserFactory, listUsersFactory } from '../factories/users'

export default (router: Router): void => {
  router.get('/users', expressRouteAdapter(listUsersFactory()))
  router.post('/users', expressRouteAdapter(createUserFactory()))
}
