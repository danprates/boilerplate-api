import { BaseModelFixture, Result } from '@/domain/models'
import { BaseModel } from '@/domain/models/base.model'
import { Find } from '@/domain/usecases'
import { FindBaseController } from '@/presentation/controllers/base'
import { badRequest, notFound, ok } from '@/presentation/helpers'
import { HttpRequest, Validation } from '@/presentation/protocols'

interface SutTypes {
  sut: FindBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  usecase: Find
  validation: Validation
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { params: { id: baseModel.id } }
  const validation: Validation = { validate: jest.fn().mockReturnValue(Result.ok(httpRequest)) }
  const usecase: Find = { find: jest.fn().mockResolvedValue(Result.ok(baseModel)) }
  const sut = new FindBaseController({ usecase, validation })

  return {
    sut,
    usecase,
    baseModel,
    validation,
    httpRequest
  }
}

describe('FindBase Controller', () => {
  it('Should call usecase with correct values', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(usecase.find).toHaveBeenNthCalledWith(1, httpRequest.params.id)
  })

  it('Should return status code 400 if request is invalid', async () => {
    const { sut, validation, httpRequest } = makeSut()
    jest.spyOn(validation, 'validate').mockReturnValueOnce(Result.fail('any_error'))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(badRequest('any_error'))
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    jest.spyOn(usecase, 'find').mockResolvedValueOnce(Result.fail('Not found'))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(notFound())
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const { sut, baseModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(ok(baseModel))
  })
})
