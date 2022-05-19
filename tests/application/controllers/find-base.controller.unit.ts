import { FindBaseController } from '@/application/controllers/base'
import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import { BaseModel, ErrorModel, Result } from '@/application/models'
import { FindRepository, HttpRequest, Validator } from '@/application/protocols'
import { BaseModelFixture } from '../fixtures/base.model.fixture'

interface SutTypes {
  sut: FindBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  validation: Validator
  findRepository: FindRepository
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { params: { id: baseModel.id } }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const findRepository: FindRepository = {
    find: jest.fn().mockResolvedValue(Result.ok(baseModel))
  }
  const logger: any = {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
  }
  const sut = new FindBaseController({ findRepository, validation, logger })

  return {
    sut,
    baseModel,
    validation,
    httpRequest,
    findRepository
  }
}

describe('FindBase Controller', () => {
  it('Should call findRepository with correct values', async () => {
    const { sut, findRepository, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(findRepository.find).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id
    )
  })

  it('Should return status code 400 if request is invalid', async () => {
    const { sut, validation, httpRequest } = makeSut()
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'run').mockReturnValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, findRepository, httpRequest } = makeSut()
    const err = ErrorModel.notFound()
    jest.spyOn(findRepository, 'find').mockResolvedValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const { sut, baseModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(ok(baseModel))
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, findRepository, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(findRepository, 'find').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
