import { ListBaseController } from '@/application/controllers/base'
import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import {
  BaseModel,
  BaseModelFixture,
  ErrorModel,
  Result
} from '@/application/models'
import { HttpRequest, ListRepository, Validator } from '@/application/protocols'

interface SutTypes {
  sut: ListBaseController
  httpRequest: HttpRequest
  baseModel: BaseModel
  listRepository: ListRepository
  validation: Validator
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const httpRequest = {}
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const listRepository: ListRepository = {
    list: jest.fn().mockResolvedValue([baseModel])
  }
  const sut = new ListBaseController({ listRepository, validation })

  return {
    sut,
    baseModel,
    validation,
    httpRequest,
    listRepository
  }
}

describe('FindBase Controller', () => {
  it('Should call listRepository with correct values', async () => {
    const { sut, listRepository, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(listRepository.list).toHaveBeenNthCalledWith(1, httpRequest.query)
  })

  it('Should return status code 400 if request is invalid', async () => {
    const { sut, httpRequest, validation } = makeSut()
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'run').mockReturnValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const { sut, baseModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(ok([baseModel]))
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, listRepository, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(listRepository, 'list').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
