import { DeleteBaseController } from '@/application/controllers/base'
import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel, Result } from '@/application/models'
import {
  HardDeleteRepository,
  HttpRequest,
  SoftDeleteRepository,
  Validator
} from '@/application/protocols'

interface SutTypes {
  sut: DeleteBaseController
  httpRequest: HttpRequest
  validation: Validator
  deleteRepository: HardDeleteRepository | SoftDeleteRepository
}

const makeSut = (): SutTypes => {
  const httpRequest = { params: { id: 'any_name' } }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const deleteRepository: HardDeleteRepository = {
    delete: jest.fn().mockResolvedValue(Result.ok(true))
  }
  const sut = new DeleteBaseController({ deleteRepository, validation })

  return {
    sut,
    validation,
    httpRequest,
    deleteRepository
  }
}

describe('DeleteBase Controller', () => {
  it('Should call deleteRepository with correct values', async () => {
    const { sut, deleteRepository, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(deleteRepository.delete).toHaveBeenNthCalledWith(
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
    const { sut, deleteRepository, httpRequest } = makeSut()
    const err = ErrorModel.notFound()
    jest
      .spyOn(deleteRepository, 'delete')
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
    const { sut, validation, deleteRepository, httpRequest } = makeSut()
    const error = new Error('any_error')

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(deleteRepository, 'delete').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
