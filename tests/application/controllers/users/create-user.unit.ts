import { CreateUserInputDTO } from '@/application/dtos'
import { created, resultErrorHandler, serverError } from '@/application/helpers'
import { ErrorModel, Result } from '@/application/models'
import { UserModel } from '@/application/models/user.model'
import { CreateRepository, Validator } from '@/application/protocols'
import CreateUser from '@/application/use-cases/create-user'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

interface SutTypes {
  sut: CreateUser
  httpRequest: CreateUserInputDTO
  userModel: UserModel
  validation: Validator
  createRepository: CreateRepository
}

const makeSut = (): SutTypes => {
  const userModel = UserModelFixture()
  const httpRequest: CreateUserInputDTO = {
    body: {
      name: userModel.name,
      email: userModel.email,
      password: userModel.password
    }
  }
  const createRepository: CreateRepository = {
    create: jest.fn().mockResolvedValue(Result.ok(userModel))
  }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const logger: any = {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
  }
  const sut = new CreateUser({ createRepository, validation, logger })

  return {
    sut,
    createRepository,
    userModel,
    validation,
    httpRequest
  }
}

describe('CreateUser Controller', () => {
  it('Should call createRepository with correct values', async () => {
    const { sut, createRepository, httpRequest } = makeSut()
    await sut.execute(httpRequest)
    expect(createRepository.create).toHaveBeenNthCalledWith(1, httpRequest.body)
  })

  it('Should call validation with correct values', async () => {
    const { sut, validation, httpRequest } = makeSut()
    await sut.execute(httpRequest)
    expect(validation.run).toHaveBeenNthCalledWith(1, httpRequest)
  })

  it('Should return 400 if validation returns fail result', async () => {
    const { sut, validation, httpRequest } = makeSut()
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'run').mockReturnValueOnce(Result.fail(err))
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 201 when correct params are provided', async () => {
    const { sut, userModel, httpRequest } = makeSut()
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(created(userModel))
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, createRepository, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.execute(httpRequest)).toEqual(serverError())

    jest.spyOn(createRepository, 'create').mockRejectedValueOnce(error)
    expect(await sut.execute(httpRequest)).toEqual(serverError())
  })
})
