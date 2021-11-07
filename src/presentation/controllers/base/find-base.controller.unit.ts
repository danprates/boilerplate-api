import { BaseModelFixture } from '@/domain/models'
import { BaseModel } from '@/domain/models/base.model'
import { Find } from '@/domain/usecases'
import { FindBaseController } from '@/presentation/controllers/base'
import { notFound, ok } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'

interface SutTypes {
  sut: FindBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  usecase: Find
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { params: { id: baseModel.id } }
  const usecase: Find = { find: jest.fn().mockResolvedValue(baseModel) }
  const sut = new FindBaseController(usecase)

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
    expect(usecase.find).toHaveBeenNthCalledWith(1, httpRequest.params.id)
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    jest.spyOn(usecase, 'find').mockResolvedValueOnce(null as any)
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(notFound())
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const { sut, baseModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(ok(baseModel))
  })
})
