import { BaseModelFixture, Result } from '@/domain/models'
import { BaseModel } from '@/domain/models/base.model'
import { Create } from '@/domain/usecases'
import { CreateBaseController } from '@/presentation/controllers/base'
import { created } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'

interface SutTypes {
  sut: CreateBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  usecase: Create
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { body: { name: 'any_name' } }
  const usecase: Create = { create: jest.fn().mockResolvedValue(Result.ok(baseModel)) }
  const sut = new CreateBaseController({ usecase })

  return {
    sut,
    usecase,
    baseModel,
    httpRequest
  }
}

describe('CreateBase Controller', () => {
  it('Should call usecase with correct values', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(usecase.create).toHaveBeenNthCalledWith(1, httpRequest.body)
  })

  it('Should return status code 201 when correct params are provided', async () => {
    const { sut, baseModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(created(baseModel))
  })
})
