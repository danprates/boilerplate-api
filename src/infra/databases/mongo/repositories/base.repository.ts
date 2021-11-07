import { BaseModel } from '@/domain/models'
import { CreateRepository } from '@/services/protocols'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../mongo.helper'

export class BaseRepository implements CreateRepository {
  constructor (private readonly collection: string) {}

  async create (data: Partial<BaseModel>): Promise<BaseModel> {
    const collection = MongoHelper.getCollection(this.collection)
    const { insertedId } = await collection.insertOne(data)
    return await this.findOne(insertedId.toString())
  }

  async findOne (id: string): Promise<BaseModel> {
    const collection = MongoHelper.getCollection(this.collection)
    const result = await collection.findOne({ _id: new ObjectId(id) })
    return result && MongoHelper.map(result)
  }
}
