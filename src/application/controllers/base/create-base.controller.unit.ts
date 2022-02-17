import { CreateBaseController } from '@/application/controllers/base'
import { created, resultErrorHandler, serverError } from '@/application/helpers'
import {
  BaseModel,
  BaseModelFixture,
  ErrorModel,
  Result
} from '@/application/models'
import { Create, HttpRequest, Validator } from '@/application/protocols'

interface SutTypes {
  sut: CreateBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  usecase: Create
  validation: Validator
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { body: { name: 'any_name' } }
  const usecase: Create = {
    create: jest.fn().mockResolvedValue(Result.ok(baseModel))
  }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const sut = new CreateBaseController({ usecase, validation })

  return {
    sut,
    usecase,
    baseModel,
    validation,
    httpRequest
  }
}

describe('CreateBase Controller', () => {
  it('Should call usecase with correct values', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(usecase.create).toHaveBeenNthCalledWith(1, httpRequest.body)
  })

  it('Should call validation with correct values', async () => {
    const { sut, validation, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(validation.run).toHaveBeenNthCalledWith(1, httpRequest)
  })

  it('Should return 400 if validation returns fail result', async () => {
    const { sut, validation, httpRequest } = makeSut()
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'run').mockReturnValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 201 when correct params are provided', async () => {
    const { sut, baseModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(created(baseModel))
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, usecase, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(usecase, 'create').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
