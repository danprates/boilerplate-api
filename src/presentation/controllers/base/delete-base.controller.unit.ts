import { Result } from '@/domain/models'
import { Delete } from '@/domain/usecases'
import { DeleteBaseController } from '@/presentation/controllers/base'
import { noContent, notFound } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'

interface SutTypes {
  sut: DeleteBaseController
  httpRequest: HttpRequest
  usecase: Delete
}

const makeSut = (): SutTypes => {
  const httpRequest = { params: { id: 'any_name' } }
  const usecase: Delete = { delete: jest.fn().mockResolvedValue(Result.ok(true)) }
  const sut = new DeleteBaseController(usecase)

  return {
    sut,
    usecase,
    httpRequest
  }
}

describe('DeleteBase Controller', () => {
  it('Should call usecase with correct values', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    await sut.handler(httpRequest)
    expect(usecase.delete).toHaveBeenNthCalledWith(1, httpRequest.params.id)
  })

  it('Should return status code 404 if data was not found', async () => {
    const { sut, usecase, httpRequest } = makeSut()
    jest.spyOn(usecase, 'delete').mockResolvedValueOnce(Result.fail('Not found'))
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(notFound())
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const { sut, httpRequest } = makeSut()
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(noContent())
  })
})
