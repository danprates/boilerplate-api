import { resultErrorHandler } from '@/application/helpers'
import { ErrorModel } from '@/application/models'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { TypeormHelper } from '@/infra/databases/typeorm/typeorm-helper'
import { API_VERSION } from '@/main/config/env.config'
import { httpFactory } from '@/main/config/http.factory'
import { UserModelFixture } from '@/tests/application/fixtures/user.model.fixture'
import request from 'supertest'
import { Repository } from 'typeorm'

describe('/users routes', () => {
  let userRepository: Repository<UserEntity>
  const wrongId = '962c798d-876d-4c99-a9cd-899253d8cd0d'
  const http = httpFactory()

  beforeAll(async () => {
    userRepository = await TypeormHelper.getRepository(UserEntity)
  })

  beforeEach(async () => {
    await userRepository.delete({})
  })

  describe('GET /users', () => {
    it('Should return a list of users', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode, body } = await request(http.app).get(
        `/api/${API_VERSION}/users`
      )

      expect(statusCode).toEqual(200)
      expect(body.total).toEqual(1)
      expect(body.skip).toEqual(0)
      expect(body.take).toEqual(10)
      expect(body.data[0].id).toEqual(user.id)
    })

    it('Should return a empty list when no exist users', async () => {
      const { statusCode, body } = await request(http.app).get(
        `/api/${API_VERSION}/users`
      )

      expect(statusCode).toEqual(200)
      expect(body.total).toEqual(0)
      expect(body.skip).toEqual(0)
      expect(body.take).toEqual(10)
      expect(body.data).toEqual([])
    })
  })

  describe('POST /users', () => {
    it('Should return a created user', async () => {
      const { name, email, password } = UserModelFixture()

      const { statusCode, body } = await request(http.app)
        .post(`/api/${API_VERSION}/users`)
        .send({ name, email, password })

      const user = await userRepository.findOne({ where: { id: body.id } })

      expect(statusCode).toEqual(201)

      expect(body.id).toEqual(user?.id)
    })
  })

  describe('GET /users/:id', () => {
    it('Should return an user', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode, body } = await request(http.app).get(
        `/api/${API_VERSION}/users/${user.id}`
      )

      expect(statusCode).toEqual(200)
      expect(body.id).toEqual(user.id)
    })

    it('Should return not found when user does not exist', async () => {
      const { statusCode, body } = await request(http.app).get(
        `/api/${API_VERSION}/users/${wrongId}`
      )

      expect({ statusCode, body }).toEqual(
        resultErrorHandler(ErrorModel.notFound())
      )
    })
  })

  describe('PUT /users/:id', () => {
    it('Should update a user', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode } = await request(http.app)
        .put(`/api/${API_VERSION}/users/${user.id}`)
        .send({ name: 'new_name' })

      const userResult = await userRepository.findOne({
        where: { id: user.id }
      })

      expect(statusCode).toEqual(204)
      expect(userResult?.name).toEqual('new_name')
    })

    it('Should return not found when user does not exist', async () => {
      const { statusCode, body } = await request(http.app)
        .put(`/api/${API_VERSION}/users/${wrongId}`)
        .send({ name: 'new_name' })

      expect({ statusCode, body }).toEqual(
        resultErrorHandler(ErrorModel.notFound())
      )
    })
  })

  describe('DELETE /users/:id', () => {
    it('Should soft delete an user', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode } = await request(http.app).delete(
        `/api/${API_VERSION}/users/${user.id}`
      )

      const userResult = await userRepository.findOne({
        where: { id: user.id },
        select: ['isDeleted', 'isActive']
      })

      expect(statusCode).toEqual(204)
      expect(userResult?.isDeleted).toBeTruthy()
      expect(userResult?.isActive).toBeFalsy()
    })

    it('Should return not found when user does not exist', async () => {
      const { statusCode, body } = await request(http.app).delete(
        `/api/${API_VERSION}/users/${wrongId}`
      )

      expect({ statusCode, body }).toEqual(
        resultErrorHandler(ErrorModel.notFound())
      )
    })
  })
})
