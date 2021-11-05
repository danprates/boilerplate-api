import { BaseModel } from '@/domain/models/base.model'
import { CreateRepository } from '../protocols'
import { DbCreateBase } from './db-create-base.usecase'

interface SutTypes {
  sut: DbCreateBase
  baseModel: BaseModel
  createRepository: CreateRepository
}

const makeSut = (): SutTypes => {
  const baseModel: BaseModel = { id: 'some_id', createdAt: new Date(), updatedAt: new Date() }
  const createRepository: CreateRepository = { create: jest.fn().mockResolvedValue(baseModel) }
  const sut = new DbCreateBase(createRepository)

  return {
    sut,
    createRepository,
    baseModel
  }
}

describe('DbCreateBase Usecase', () => {
  it('Should call CreateRepository with correct values', async () => {
    const { sut, createRepository, baseModel } = makeSut()
    await sut.create(baseModel)
    expect(createRepository.create).toHaveBeenNthCalledWith(1, baseModel)
  })

  it('Should thow error when CreateRepository throws', async () => {
    const { sut, createRepository } = makeSut()
    jest.spyOn(createRepository, 'create').mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.create(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return created data when everything is ok', async () => {
    const { sut, baseModel } = makeSut()
    const result = await sut.create(baseModel)
    expect(result).toEqual(baseModel)
  })
})
