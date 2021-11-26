import { gql } from 'apollo-server-express'

export default gql`
  scalar Void

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  input ParamsInput {
    id: ID!
  }

  input PaginationInput {
    take: Int
    skip: Int
  }
`
