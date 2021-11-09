import { BaseModelFixture, Result } from '@/domain/models'
import { BaseModel } from '@/domain/models/base.model'
import { List } from '@/domain/usecases'
import { ListBaseController } from '@/presentation/controllers/base'
import { ok } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'

interface SutTypes {
  sut: ListBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  usecase: List
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = {}
  const usecase: List = { list: jest.fn().mockResolvedValue(Result.ok([baseModel])) }
  const sut = new ListBaseController({ usecase })

  return {
    sut,
    usecase,
    baseModel,
    httpRequest
  }
}

describe('FindBase Controller', () => {
  it('Should call usecase with correct values', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(usecase.list).toHaveBeenNthCalledWith(1, httpRequest.query)
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const { sut, baseModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(ok([baseModel]))
  })
})
