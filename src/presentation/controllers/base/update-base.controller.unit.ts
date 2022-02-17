import {
  BaseModel,
  BaseModelFixture,
  ErrorModel,
  Result
} from '@/domain/models'
import { Update } from '@/domain/protocols'
import { UpdateBaseController } from '@/presentation/controllers/base'
import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/presentation/helpers'
import { HttpRequest, Validation } from '@/presentation/protocols'

interface SutTypes {
  sut: UpdateBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  usecase: Update
  validation: Validation
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { params: { id: baseModel.id }, body: baseModel }
  const validation: Validation = {
    validate: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const usecase: Update = {
    update: jest.fn().mockResolvedValue(Result.ok(baseModel))
  }
  const sut = new UpdateBaseController({ usecase, validation })

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
    expect(usecase.update).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id,
      httpRequest.body
    )
  })

  it('Should return status code 400 if request is invalid', async () => {
    const { sut, validation, httpRequest } = makeSut()
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'validate').mockReturnValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    const err = ErrorModel.notFound()
    jest.spyOn(usecase, 'update').mockResolvedValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const { sut, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(noContent())
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, usecase, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(usecase, 'update').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
