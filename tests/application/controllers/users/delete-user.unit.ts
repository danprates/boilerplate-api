import { DeleteUserInputDTO } from '@/application/dtos'
import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel, Result } from '@/application/models'
import {
  HardDeleteRepository,
  SoftDeleteRepository,
  Validator
} from '@/application/protocols'
import DeleteUser from '@/application/use-cases/delete-user'

interface SutTypes {
  sut: DeleteUser
  httpRequest: DeleteUserInputDTO
  validation: Validator
  deleteRepository: HardDeleteRepository | SoftDeleteRepository
}

const makeSut = (): SutTypes => {
  const httpRequest: DeleteUserInputDTO = { params: { id: 'any_name' } }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const deleteRepository: HardDeleteRepository = {
    delete: jest.fn().mockResolvedValue(Result.ok(true))
  }
  const logger: any = {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
  }
  const sut = new DeleteUser({ deleteRepository, validation, logger })

  return {
    sut,
    validation,
    httpRequest,
    deleteRepository
  }
}

describe('DeleteUser Controller', () => {
  it('Should call deleteRepository with correct values', async () => {
    const { sut, deleteRepository, httpRequest } = makeSut()
    await sut.execute(httpRequest)
    expect(deleteRepository.delete).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id
    )
  })

  it('Should return status code 400 if request is invalid', async () => {
    const { sut, validation, httpRequest } = makeSut()
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'run').mockReturnValueOnce(Result.fail(err))
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, deleteRepository, httpRequest } = makeSut()
    const err = ErrorModel.notFound()
    jest
      .spyOn(deleteRepository, 'delete')
      .mockResolvedValueOnce(Result.fail(err))
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const { sut, httpRequest } = makeSut()
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(noContent())
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const { sut, validation, deleteRepository, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.execute(httpRequest)).toEqual(serverError())

    jest.spyOn(deleteRepository, 'delete').mockRejectedValueOnce(error)
    expect(await sut.execute(httpRequest)).toEqual(serverError())
  })
})
