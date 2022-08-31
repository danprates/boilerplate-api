import { ErrorEntity, Result } from '@/domain/entities'
import { noContent, resultErrorHandler } from '@/domain/helpers'
import { Domain } from '@/domain/protocols'
import DeleteUser from '@/domain/use-cases/delete-user'
import { containerFixture } from '@/tests/infra/container.fixture'

describe('DeleteUser Controller', () => {
  const httpRequest: Domain.Request = { params: { id: 'any_name' } }
  let sut: DeleteUser

  beforeEach(() => {
    jest
      .spyOn(containerFixture.repository, 'softDelete')
      .mockResolvedValue(Result.ok(true))
    sut = new DeleteUser(containerFixture)
  })

  it('Should call deleteRepository with correct values', async () => {
    await sut.execute(httpRequest)
    expect(containerFixture.repository.softDelete).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id
    )
  })

  it('Should return status code 404 if data was not found', async () => {
    const err = ErrorEntity.notFound()
    jest
      .spyOn(containerFixture.repository, 'softDelete')
      .mockResolvedValueOnce(Result.fail(err))
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(noContent())
  })
})
