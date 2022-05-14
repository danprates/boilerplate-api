import {
  createUserFactory,
  deleteUserFactory,
  findUsersFactory,
  listUsersFactory,
  updateUserFactory
} from '@/infra/factories/users'
import { apolloServerAdapter } from '@/infra/graphql/apollo-server.adapter'

export default {
  Query: {
    listUsers: apolloServerAdapter(listUsersFactory()),
    findUser: apolloServerAdapter(findUsersFactory())
  },
  Mutation: {
    createUser: apolloServerAdapter(createUserFactory()),
    updateUser: apolloServerAdapter(updateUserFactory()),
    deleteUser: apolloServerAdapter(deleteUserFactory())
  }
}
