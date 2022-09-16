import { gql } from 'apollo-server-core'

export default gql`
  extend type Query {
    ListUsers(pagination: PaginationInput): ListUserResult!
    FindUser(params: ParamsInput!): User!
  }

  extend type Mutation {
    CreateUser(body: CreateUserInput!): User!
    UpdateUser(params: ParamsInput!, body: UpdateUserInput!): Void
    DeleteUser(params: ParamsInput!): Void
  }

  type ListUserResult {
    skip: Int
    take: Int
    total: Int
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
