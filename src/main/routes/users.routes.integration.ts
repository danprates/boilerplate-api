import { UserModelFixture } from '@/domain/models/user.model.fixture'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { TypeormHelper } from '@/infra/databases/typeorm/typeorm-helper'
import request from 'supertest'
import { Repository } from 'typeorm'
import app from '../config/app'
import { API_VERSION } from '../config/env.config'

describe('/users routes', () => {
  let userRepository: Repository<UserEntity>

  beforeAll(async () => {
    userRepository = await TypeormHelper.getRepository(UserEntity)
  })

  beforeEach(async () => {
    await userRepository.delete({})
  })

  describe('GET /users', () => {
    it('Should return a list of users', async () => {
      const user = await userRepository.save(UserModelFixture())

      const { statusCode, body } = await request(app).get(`/api/${API_VERSION}/users`)

      expect(statusCode).toEqual(200)
      expect(body.total).toEqual(1)
      expect(body.skip).toEqual(0)
      expect(body.take).toEqual(10)
      expect(body.data[0].id).toEqual(user.id)
    })

    it('Should return a empty list when no exist users', async () => {
      const { statusCode, body } = await request(app).get(`/api/${API_VERSION}/users`)

      expect(statusCode).toEqual(200)
      expect(body.total).toEqual(0)
      expect(body.skip).toEqual(0)
      expect(body.take).toEqual(10)
      expect(body.data).toEqual([])
    })
  })
})
