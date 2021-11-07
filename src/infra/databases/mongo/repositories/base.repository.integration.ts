import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../mongo.helper'
import { BaseRepository } from './base.repository'

const COLLECTION_NAME = 'base'

const makeSut = (): BaseRepository => {
  return new BaseRepository(COLLECTION_NAME)
}

describe('BaseRepository Mongodb', () => {
  let baseCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/boilerplate_test')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    baseCollection = MongoHelper.getCollection(COLLECTION_NAME)
    await baseCollection.deleteMany({})
  })

  describe('create()', () => {
    test('Should return an correct data on success', async () => {
      const sut = makeSut()
      const data = { createdAt: new Date() }
      const result = await sut.create(data)
      expect(result.id).toBeTruthy()
      expect(result.createdAt).toEqual(data.createdAt)
    })
  })

  describe('find()', () => {
    const id = new ObjectId()

    test('Should return an correct data on success', async () => {
      const sut = makeSut()
      await baseCollection.insertOne({ _id: id })
      const result = await sut.find(id.toHexString())
      expect(result?.id).toBeTruthy()
    })

    test('Should return null when id was not found', async () => {
      const sut = makeSut()
      const result = await sut.find(id.toHexString())
      expect(result).toBeNull()
    })
  })
})
