import { CreateBaseController } from '@/application/controllers/base'
import { created, resultErrorHandler, serverError } from '@/application/helpers'
import { BaseModel, ErrorModel, Result } from '@/application/models'
import {
  CreateRepository,
  HttpRequest,
  Validator
} from '@/application/protocols'
import { BaseModelFixture } from '../fixtures/base.model.fixture'

interface SutTypes {
  sut: CreateBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  validation: Validator
  createRepository: CreateRepository
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = { body: { name: 'any_name' } }
  const createRepository: CreateRepository = {
    create: jest.fn().mockResolvedValue(Result.ok(baseModel))
  }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const sut = new CreateBaseController({ createRepository, validation })

  return {
    sut,
    createRepository,
    baseModel,
    validation,
    httpRequest
  }
}

describe('CreateBase Controller', () => {
  it('Should call createRepository with correct values', async () => {
    const { sut, createRepository, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(createRepository.create).toHaveBeenNthCalledWith(1, httpRequest.body)
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
    const { sut, validation, createRepository, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(createRepository, 'create').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
