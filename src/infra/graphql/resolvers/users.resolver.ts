import CreateUser from '@/application/use-cases/create-user'
import DeleteUser from '@/application/use-cases/delete-user'
import FindUser from '@/application/use-cases/find-user'
import ListUsers from '@/application/use-cases/list-users'
import UpdateUser from '@/application/use-cases/update-user'
import { container } from '@/infra/container'
import { apolloServerAdapter } from '@/infra/graphql/apollo-server.adapter'

export default {
  Query: {
    listUsers: apolloServerAdapter(new ListUsers(container)),
    findUser: apolloServerAdapter(new FindUser(container))
  },
  Mutation: {
    createUser: apolloServerAdapter(new CreateUser(container)),
    updateUser: apolloServerAdapter(new UpdateUser(container)),
    deleteUser: apolloServerAdapter(new DeleteUser(container))
  }
}
