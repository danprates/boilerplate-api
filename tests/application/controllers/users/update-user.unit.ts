import { UpdateUserInputDTO } from '@/application/dtos'
import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel, Result } from '@/application/models'
import { UserModel } from '@/application/models/user.model'
import { UpdateRepository, Validator } from '@/application/protocols'
import UpdateUser from '@/application/use-cases/update-user'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

interface SutTypes {
  sut: UpdateUser
  httpRequest: UpdateUserInputDTO
  userModel: UserModel
  validation: Validator
  updateRepository: UpdateRepository
}

const makeSut = (): SutTypes => {
  const userModel = UserModelFixture()
  const httpRequest: UpdateUserInputDTO = {
    params: { id: userModel.id },
    body: userModel
  }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const updateRepository: UpdateRepository = {
    update: jest.fn().mockResolvedValue(Result.ok(true))
  }
  const logger: any = {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
  }
  const sut = new UpdateUser({ updateRepository, validation, logger })

  return {
    sut,
    userModel,
    validation,
    httpRequest,
    updateRepository
  }
}

describe('UpdateUser Controller', () => {
  it('Should call updateRepository with correct values', async () => {
    const { sut, updateRepository, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(updateRepository.update).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id,
      httpRequest.body
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
    const { sut, updateRepository, httpRequest } = makeSut()
    const err = ErrorModel.notFound()
    jest
      .spyOn(updateRepository, 'update')
      .mockResolvedValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const { sut, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(noContent())
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, updateRepository, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(updateRepository, 'update').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
