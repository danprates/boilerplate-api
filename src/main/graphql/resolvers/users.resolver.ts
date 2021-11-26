import { apolloServerAdapter } from '@/main/adapters/apollo-server.adapter'
import {
  createUserFactory,
  deleteUserFactory,
  findUsersFactory,
  listUsersFactory,
  updateUserFactory
} from '@/main/factories/users'

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
