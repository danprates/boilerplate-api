import { ErrorModel, Result } from '@/application/models'
import { Delete, Validator } from '@/application/protocols'
import { DeleteBaseController } from '@/presentation/controllers/base'
import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'

interface SutTypes {
  sut: DeleteBaseController
  httpRequest: HttpRequest
  usecase: Delete
  validation: Validator
}

const makeSut = (): SutTypes => {
  const httpRequest = { params: { id: 'any_name' } }
  const validation: Validator = {
    run: jest.fn().mockReturnValue(Result.ok(httpRequest))
  }
  const usecase: Delete = {
    delete: jest.fn().mockResolvedValue(Result.ok(true))
  }
  const sut = new DeleteBaseController({ usecase, validation })

  return {
    sut,
    usecase,
    validation,
    httpRequest
  }
}

describe('DeleteBase Controller', () => {
  it('Should call usecase with correct values', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(usecase.delete).toHaveBeenNthCalledWith(1, httpRequest.params.id)
  })

  it('Should return status code 400 if request is invalid', async () => {
    const { sut, validation, httpRequest } = makeSut()
    const err = ErrorModel.invalidParams('any_error')
    jest.spyOn(validation, 'run').mockReturnValueOnce(Result.fail(err))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    const err = ErrorModel.notFound()
    jest.spyOn(usecase, 'delete').mockResolvedValueOnce(Result.fail(err))
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

    jest.spyOn(validation, 'run').mockImplementationOnce(() => {
      throw error
    })
    expect(await sut.handler(httpRequest)).toEqual(serverError())

    jest.spyOn(usecase, 'delete').mockRejectedValueOnce(error)
    expect(await sut.handler(httpRequest)).toEqual(serverError())
  })
})
