import {
  BaseModel,
  BaseModelFixture,
  ErrorModel,
  Result
} from '@/domain/models'
import { FindRepository } from '@/domain/protocols'
import { DbFindBase } from './db-find-base.usecase'

interface SutTypes {
  sut: DbFindBase
  baseModel: BaseModel
  findRepository: FindRepository
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const findRepository: FindRepository = {
    find: jest.fn().mockResolvedValue(baseModel)
  }
  const sut = new DbFindBase({ findRepository })

  return {
    sut,
    baseModel,
    findRepository
  }
}

describe('DbFindBase Usecase', () => {
  it('Should call FindRepository with correct values', async () => {
    const { sut, findRepository, baseModel } = makeSut()
    await sut.find(baseModel.id)
    expect(findRepository.find).toHaveBeenNthCalledWith(1, baseModel.id)
  })

  it('Should throw error when FindRepository throws', async () => {
    const { sut, findRepository } = makeSut()
    jest
      .spyOn(findRepository, 'find')
      .mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.find(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return undefined when data was not found', async () => {
    const { sut, findRepository } = makeSut()
    jest.spyOn(findRepository, 'find').mockResolvedValueOnce(undefined)
    const result = await sut.find(null as any)
    expect(result).toEqual(Result.fail(ErrorModel.notFound()))
  })

  it('Should return correct data when everything is ok', async () => {
    const { sut, baseModel } = makeSut()
    const result = await sut.find(baseModel.id)
    expect(result).toEqual(Result.ok(baseModel))
  })
})
