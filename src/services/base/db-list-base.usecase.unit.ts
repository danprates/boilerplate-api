import { BaseModel } from '@/domain/models'
import { ListOptions, Pagination } from '@/domain/protocols'
import { ListRepository } from '../protocols'
import { DbListBase } from './db-list-base.usecase'

interface SutTypes {
  sut: DbListBase
  baseModel: BaseModel
  listOptions: ListOptions
  listRepository: ListRepository
  pagination: Pagination<BaseModel>
}

const makeSut = (): SutTypes => {
  const baseModel: BaseModel = { id: 'some_id', createdAt: new Date(), updatedAt: new Date() }
  const listOptions: ListOptions = { pagination: { skip: 0, take: 10 } }
  const pagination: Pagination<BaseModel> = {
    data: [baseModel],
    total: 1,
    ...listOptions.pagination
  }
  const listRepository: ListRepository = { list: jest.fn().mockResolvedValue(baseModel) }
  const sut = new DbListBase(listRepository)

  return {
    sut,
    baseModel,
    pagination,
    listOptions,
    listRepository
  }
}

describe('DbListBase Usecase', () => {
  it('Should call ListRepository with correct values', async () => {
    const { sut, listRepository, listOptions } = makeSut()
    await sut.list(listOptions)
    expect(listRepository.list).toHaveBeenNthCalledWith(1, listOptions)
  })

  it('Should thow error when ListRepository throws', async () => {
    const { sut, listRepository } = makeSut()
    jest.spyOn(listRepository, 'list').mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.list(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should correct data when everything is ok', async () => {
    const { sut, baseModel, listOptions } = makeSut()
    const result = await sut.list(listOptions)
    expect(result).toEqual(baseModel)
  })
})
