import { BaseModel, BaseModelFixture, Result } from '@/domain/models'
import { CreateRepository } from '../../protocols'
import { DbCreateBase } from './db-create-base.usecase'

interface SutTypes {
  sut: DbCreateBase
  baseModel: BaseModel
  createRepository: CreateRepository
}

const makeSut = (): SutTypes => {
  const baseModel: BaseModel = BaseModelFixture()
  const createRepository: CreateRepository = { create: jest.fn().mockResolvedValue(Result.ok(baseModel)) }
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

  it('Should throw error when CreateRepository throws', async () => {
    const { sut, createRepository } = makeSut()
    jest.spyOn(createRepository, 'create').mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.create(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return fail result when CreateRepository return fail', async () => {
    const { sut, createRepository, baseModel } = makeSut()
    jest.spyOn(createRepository, 'create').mockResolvedValueOnce(Result.fail('any_fail'))
    const promise = await sut.create(baseModel)
    expect(promise.isFailure).toBeTruthy()
    expect(promise.error).toEqual('any_fail')
  })

  it('Should return success result with created data when everything is ok', async () => {
    const { sut, baseModel } = makeSut()
    const result = await sut.create(baseModel)
    expect(result).toEqual(Result.ok(baseModel))
  })
})
