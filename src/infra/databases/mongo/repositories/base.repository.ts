import { BaseModel } from '@/domain/models'
import { CreateRepository, FindRepository } from '@/services/protocols'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../mongo.helper'

export class BaseRepository implements CreateRepository, FindRepository {
  constructor (private readonly collection: string) {}

  async create (data: Partial<BaseModel>): Promise<BaseModel> {
    const collection = MongoHelper.getCollection(this.collection)
    const { insertedId } = await collection.insertOne(data)

    const result = await this.find(insertedId.toString())
    if (!result) {
      throw new Error('It was not possible to insert a new data')
    }

    return result
  }

  async find (id: string): Promise<BaseModel | undefined> {
    const collection = MongoHelper.getCollection(this.collection)
    const result = await collection.findOne({ _id: new ObjectId(id) })
    return result && MongoHelper.map(result)
  }
}
