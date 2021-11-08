import { BaseModelFixture, Result } from '@/domain/models'
import { BaseModel } from '@/domain/models/base.model'
import { Update } from '@/domain/usecases'
import { UpdateBaseController } from '@/presentation/controllers/base'
import { noContent, notFound } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'

interface SutTypes {
  sut: UpdateBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  usecase: Update
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { params: { id: baseModel.id }, body: baseModel }
  const usecase: Update = { update: jest.fn().mockResolvedValue(Result.ok(baseModel)) }
  const sut = new UpdateBaseController(usecase)

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
    expect(usecase.update).toHaveBeenNthCalledWith(1, httpRequest.params.id, httpRequest.body)
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    jest.spyOn(usecase, 'update').mockResolvedValueOnce(Result.fail('Not found'))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(notFound())
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const { sut, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(noContent())
  })
})
