import { FindUserInputDTO } from '@/application/dtos'
import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import { ErrorModel, Result } from '@/application/models'
import { UserModel } from '@/application/models/user.model'
import { FindRepository, Validator } from '@/application/protocols'
import FindUser from '@/application/use-cases/find-user'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

interface SutTypes {
  sut: FindUser
  httpRequest: FindUserInputDTO
  userModel: UserModel
  validation: Validator
  findRepository: FindRepository
}

const makeSut = (): SutTypes => {
  const userModel = UserModelFixture()
  const httpRequest: FindUserInputDTO = { params: { id: userModel.id } }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const findRepository: FindRepository = {
    find: jest.fn().mockResolvedValue(Result.ok(userModel))
  }
  const logger: any = {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
  }
  const sut = new FindUser({ findRepository, validation, logger })

  return {
    sut,
    userModel,
    validation,
    httpRequest,
    findRepository
  }
}

describe('FindUser Controller', () => {
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
    const { sut, userModel, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(ok(userModel))
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
