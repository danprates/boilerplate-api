import { ErrorModel } from '@/application/models'
import { UserModelFixture } from '@/application/models/user.model.fixture'
import { config } from 'dotenv'
import { Repository } from 'typeorm'
import { BaseRepository } from '.'
import { UserEntity } from '../entities'
import { TypeormHelper } from '../typeorm-helper'

config({ path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env' })

describe('BaseRepository', () => {
  let userRepository: Repository<UserEntity>
  let sut: BaseRepository

  beforeAll(async () => {
    userRepository = await TypeormHelper.getRepository(UserEntity)
    sut = new BaseRepository(UserEntity)
  })

  beforeEach(async () => {
    await userRepository.delete({})
  })

  describe('create', () => {
    it('should create a new user', async () => {
      const userResult = await sut.create(UserModelFixture())
      const user = userResult.getValue()
      const result = await userRepository.findOne({
        id: user?.id
      })

      expect(user?.id).toEqual(result?.id)
    })
  })

  describe('list', () => {
    it('should return a list of users', async () => {
      const user = await userRepository.save(UserModelFixture())
      const result = await sut.list({ take: 10, skip: 0 })
      const value = result.getValue()

      expect(value?.total).toEqual(1)
      expect(value?.take).toEqual(10)
      expect(value?.skip).toEqual(0)
      expect(value?.data[0].id).toEqual(user.id)
    })

    it('should return an empty list when does not exist users', async () => {
      const result = await sut.list({ take: 10, skip: 0 })
      const value = result.getValue()

      expect(value?.total).toEqual(0)
      expect(value?.take).toEqual(10)
      expect(value?.skip).toEqual(0)
      expect(value?.data).toEqual([])
    })
  })

  describe('find', () => {
    it('should return an user', async () => {
      const user = await userRepository.save(UserModelFixture())
      const result = await sut.find(user.id)
      const value = result.getValue()

      expect(result.isSuccess).toBeTruthy()
      expect(value?.id).toEqual(user.id)
    })

    it('should return Not found when does not exist user', async () => {
      const result = await sut.find('wrong_id')

      expect(result.isFailure).toBeTruthy()
      expect(result.error).toEqual(ErrorModel.notFound())
    })
  })

  describe('update', () => {
    it('should update the user', async () => {
      const user = await userRepository.save(UserModelFixture())
      const updated = await sut.update(user.id, { isActive: !user.isActive })
      const result = await userRepository.findOne({
        where: {
          id: user.id
        },
        select: ['isActive']
      })
      const value = updated.getValue()

      expect(updated.isSuccess).toBeTruthy()
      expect(value).toBeTruthy()
      expect(result?.isActive).toEqual(!user.isActive)
    })

    it('should return Not found when does not exist user', async () => {
      const updated = await sut.update('wrong_id', { isActive: false })

      expect(updated.isFailure).toBeTruthy()
      expect(updated.error).toEqual(ErrorModel.notFound())
    })
  })

  describe('delete', () => {
    it('should delete the user', async () => {
      const user = await userRepository.save(UserModelFixture())
      const updated = await sut.delete(user.id)
      const result = await userRepository.findOne({
        where: { id: user.id },
        select: ['isActive', 'isDeleted']
      })
      const value = updated.getValue()

      expect(updated.isSuccess).toBeTruthy()
      expect(value).toBeTruthy()
      expect(result?.isActive).toBeFalsy()
      expect(result?.isDeleted).toBeTruthy()
    })

    it('should return Not found when does not exist user', async () => {
      const updated = await sut.delete('wrong_id')

      expect(updated.isFailure).toBeTruthy()
      expect(updated.error).toEqual(ErrorModel.notFound())
    })
  })
})
