import { gql } from 'apollo-server-core'

export default gql`
  extend type Query {
    listUsers(pagination: PaginationInput): ListUserResult!
    findUser(params: ParamsInput!): User!
  }

  extend type Mutation {
    createUser(body: CreateUserInput!): User!
    updateUser(params: ParamsInput!, body: UpdateUserInput!): Void
    deleteUser(params: ParamsInput!): Void
  }

  type ListUserResult {
    skip: Int!
    take: Int!
    total: Int!
    data: [User]!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  type User {
    id: ID!
    createdAt: String!
    updatedAt: String!
    name: String!
    email: String
  }
`
