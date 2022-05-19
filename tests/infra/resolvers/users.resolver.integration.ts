import { UserEntity } from '@/infra/databases/typeorm/entities'
import { TypeormHelper } from '@/infra/databases/typeorm/typeorm-helper'
import ExpressAdapter from '@/infra/http/express.adapter'
import { UserModelFixture } from '@/tests/application/fixtures/user.model.fixture'
import request from 'supertest'
import { Repository } from 'typeorm'

describe('Users resolvers', () => {
  let userRepository: Repository<UserEntity>
  const wrongId = '962c798d-876d-4c99-a9cd-899253d8cd0d'
  const http = new ExpressAdapter()

  beforeAll(async () => {
    userRepository = await TypeormHelper.getRepository(UserEntity)
  })

  beforeEach(async () => {
    await userRepository.delete({})
  })

  describe('listUsers', () => {
    it('Should list all users', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode, body } = await request(http.app)
        .post('/graphql')
        .send({
          query: `query ListUsers($pagination: PaginationInput) {
            listUsers(pagination: $pagination) {
              skip
              take
              total
              data {
                name
              }
            }
          }`,
          variables: {
            pagination: {
              take: null,
              skip: null
            }
          }
        })

      expect(statusCode).toEqual(200)
      expect(body).toEqual({
        data: {
          listUsers: {
            skip: 0,
            take: 10,
            total: 1,
            data: [{ name: user.name }]
          }
        }
      })
    })
  })

  describe('createUser', () => {
    it('Should create the user', async () => {
      const { name, email, password } = UserModelFixture()

      const { statusCode, body } = await request(http.app)
        .post('/graphql')
        .send({
          query: `mutation($body: CreateUserInput!) {
            createUser(body: $body) {
              id
            }
          }`,
          variables: {
            body: { name, email, password }
          }
        })
      const user = await userRepository.findOne({ where: { id: body.id } })

      expect(statusCode).toEqual(200)
      expect(body).toEqual({
        data: {
          createUser: { id: user?.id }
        }
      })
    })
  })

  describe('findUser', () => {
    it('Should return the correct user', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode, body } = await request(http.app)
        .post('/graphql')
        .send({
          query: `query FindUser($params: ParamsInput!) {
            findUser(params: $params) {
              id
            }
          }`,
          variables: {
            params: {
              id: user.id
            }
          }
        })

      expect(statusCode).toEqual(200)
      expect(body).toEqual({
        data: {
          findUser: {
            id: user.id
          }
        }
      })
    })

    it('Should not found when user does not exist', async () => {
      const { statusCode, body } = await request(http.app)
        .post('/graphql')
        .send({
          query: `query FindUser($params: ParamsInput!) {
            findUser(params: $params) {
              id
            }
          }`,
          variables: {
            params: {
              id: wrongId
            }
          }
        })

      expect(statusCode).toEqual(200)
      expect(body.errors[0].message).toEqual('Resource Not found')
    })
  })

  describe('updateUser', () => {
    it('Should return the correct user', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode, body } = await request(http.app)
        .post('/graphql')
        .send({
          query: `mutation UpdateUser($params: ParamsInput!, $body: UpdateUserInput!) {
            updateUser(params: $params, body: $body)
          }`,
          variables: {
            params: {
              id: user.id
            },
            body: {
              name: 'new_name'
            }
          }
        })

      const userResult = await userRepository.findOne({
        where: { id: user.id }
      })

      expect(userResult?.name).toEqual('new_name')
      expect(statusCode).toEqual(200)
      expect(body).toEqual({
        data: {
          updateUser: null
        }
      })
    })

    it('Should not found when user does not exist', async () => {
      const { statusCode, body } = await request(http.app)
        .post('/graphql')
        .send({
          query: `mutation UpdateUser($params: ParamsInput!, $body: UpdateUserInput!) {
            updateUser(params: $params, body: $body)
          }`,
          variables: {
            params: {
              id: wrongId
            },
            body: {
              name: 'any_text'
            }
          }
        })

      expect(statusCode).toEqual(200)
      expect(body.errors[0].message).toEqual('Resource Not found')
    })
  })

  describe('deleteUser', () => {
    it('Should return the correct user', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode, body } = await request(http.app)
        .post('/graphql')
        .send({
          query: `mutation DeleteUser($params: ParamsInput!) {
            deleteUser(params: $params)
          }`,
          variables: {
            params: {
              id: user.id
            }
          }
        })

      const userResult = await userRepository.findOne({
        where: { id: user.id },
        select: ['isDeleted', 'isActive']
      })

      expect(statusCode).toEqual(200)
      expect(body).toEqual({
        data: {
          deleteUser: null
        }
      })
      expect(userResult?.isDeleted).toBeTruthy()
      expect(userResult?.isActive).toBeFalsy()
    })

    it('Should not found when user does not exist', async () => {
      const { statusCode, body } = await request(http.app)
        .post('/graphql')
        .send({
          query: `mutation DeleteUser($params: ParamsInput!) {
            deleteUser(params: $params)
          }`,
          variables: {
            params: {
              id: wrongId
            }
          }
        })

      expect(statusCode).toEqual(200)
      expect(body.errors[0].message).toEqual('Resource Not found')
    })
  })
})
