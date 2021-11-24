import { BaseModel, BaseModelFixture, Result } from '@/domain/models'
import { Pagination, PaginationOptions } from '@/domain/protocols'
import { ListRepository } from '../../protocols'
import { DbListBase } from './db-list-base.usecase'

interface SutTypes {
  sut: DbListBase
  baseModel: BaseModel
  paginationOptions: PaginationOptions
  listRepository: ListRepository
  pagination: Pagination<BaseModel>
}

const makeSut = (): SutTypes => {
  const baseModel: BaseModel = BaseModelFixture()
  const paginationOptions: PaginationOptions = { skip: 0, take: 10 }
  const pagination: Pagination<BaseModel> = {
    data: [baseModel],
    total: 1,
    ...paginationOptions
  }
  const listRepository: ListRepository = {
    list: jest.fn().mockResolvedValue(baseModel)
  }
  const sut = new DbListBase({ listRepository })

  return {
    sut,
    baseModel,
    pagination,
    paginationOptions,
    listRepository
  }
}

describe('DbListBase Usecase', () => {
  it('Should call ListRepository with correct values', async () => {
    const { sut, listRepository, paginationOptions } = makeSut()
    await sut.list(paginationOptions)
    expect(listRepository.list).toHaveBeenNthCalledWith(1, paginationOptions)
  })

  it('Should throw error when ListRepository throws', async () => {
    const { sut, listRepository } = makeSut()
    jest
      .spyOn(listRepository, 'list')
      .mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.list(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should correct data when everything is ok', async () => {
    const { sut, baseModel, paginationOptions } = makeSut()
    const result = await sut.list(paginationOptions)
    expect(result).toEqual(Result.ok(baseModel))
  })
})
