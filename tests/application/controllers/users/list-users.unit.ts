import { ListUserInputDTO } from '@/application/dtos'
import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import { ErrorModel, Result } from '@/application/models'
import { UserModel } from '@/application/models/user.model'
import { ListRepository, Validator } from '@/application/protocols'
import ListUsers from '@/application/use-cases/list-users'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

interface SutTypes {
  sut: ListUsers
  httpRequest: ListUserInputDTO
  userModel: UserModel
  listRepository: ListRepository
  validation: Validator
}

const makeSut = (): SutTypes => {
  const userModel = UserModelFixture()
  const httpRequest: ListUserInputDTO = {}
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const listRepository: ListRepository = {
    list: jest.fn().mockResolvedValue(Result.ok([userModel]))
  }
  const logger: any = {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
  }
  const sut = new ListUsers({ listRepository, validation, logger })

  return {
    sut,
    userModel,
    validation,
    httpRequest,
    listRepository
  }
}

describe('ListUsers Controller', () => {
  it('Should call listRepository with correct values', async () => {
    const { sut, listRepository, httpRequest } = makeSut()
    await sut.execute(httpRequest)
    expect(listRepository.list).toHaveBeenNthCalledWith(1, httpRequest.query)
  })

  it('Should return status code 400 if request is invalid', async () => {
    const { sut, httpRequest, validation } = makeSut()
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'run').mockReturnValueOnce(Result.fail(err))
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const { sut, userModel, httpRequest } = makeSut()
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(ok([userModel]))
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, listRepository, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.execute(httpRequest)).toEqual(serverError())

    jest.spyOn(listRepository, 'list').mockRejectedValueOnce(error)
    expect(await sut.execute(httpRequest)).toEqual(serverError())
  })
})
