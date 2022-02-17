import { FindBaseController } from '@/application/controllers/base'
import {
  BaseModel,
  BaseModelFixture,
  ErrorModel,
  Result
} from '@/application/models'
import { Find, HttpRequest, Validator } from '@/application/protocols'
import { ok, resultErrorHandler, serverError } from '@/presentation/helpers'

interface SutTypes {
  sut: FindBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  usecase: Find
  validation: Validator
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { params: { id: baseModel.id } }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const usecase: Find = {
    find: jest.fn().mockResolvedValue(Result.ok(baseModel))
  }
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
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'run').mockReturnValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    const err = ErrorModel.notFound()
    jest.spyOn(usecase, 'find').mockResolvedValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const { sut, baseModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(ok(baseModel))
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, usecase, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(usecase, 'find').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
