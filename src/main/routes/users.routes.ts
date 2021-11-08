import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express-route.adapter'
import { createUserFactory, deleteUserFactory, findUsersFactory, listUsersFactory, updateUserFactory } from '../factories/users'

export default (router: Router): void => {
  router.get('/users', expressRouteAdapter(listUsersFactory()))
  router.post('/users', expressRouteAdapter(createUserFactory()))
  router.get('/users/:id', expressRouteAdapter(findUsersFactory()))
  router.put('/users/:id', expressRouteAdapter(updateUserFactory()))
  router.delete('/users/:id', expressRouteAdapter(deleteUserFactory()))
}
