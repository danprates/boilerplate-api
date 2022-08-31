import { ErrorEntity, Result } from '@/domain/entities'
import { User } from '@/domain/entities/user'
import { ok, resultErrorHandler } from '@/domain/helpers'
import { Domain } from '@/domain/protocols'
import FindUser from '@/domain/use-cases/find-user'
import { containerFixture } from '@/tests/infra/container.fixture'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

describe('FindUser Controller', () => {
  let userModel: User
  let httpRequest: Domain.Request
  let sut: FindUser

  beforeEach(() => {
    userModel = UserModelFixture()
    httpRequest = { params: { id: userModel.id } }
    jest
      .spyOn(containerFixture.repository, 'find')
      .mockResolvedValue(Result.ok(userModel))
    sut = new FindUser(containerFixture)
  })

  it('Should call findRepository with correct values', async () => {
    await sut.execute(httpRequest)
    expect(containerFixture.repository.find).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id
    )
  })

  it('Should return status code 404 if data was not found', async () => {
    const err = ErrorEntity.notFound()
    jest
      .spyOn(containerFixture.repository, 'find')
      .mockResolvedValueOnce(Result.fail(err))
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(ok(userModel))
  })
})
