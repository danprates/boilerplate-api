import { ErrorEntity, Result } from '@/domain/entities'
import { User } from '@/domain/entities/user'
import { noContent, resultErrorHandler } from '@/domain/helpers'
import { Domain } from '@/domain/protocols'
import UpdateUser from '@/domain/use-cases/update-user'
import { containerFixture } from '@/tests/infra/container.fixture'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

describe('UpdateUser Controller', () => {
  let userModel: User = UserModelFixture()
  let httpRequest: Domain.Request
  let sut: UpdateUser

  beforeEach(() => {
    userModel = UserModelFixture()
    httpRequest = {
      params: { id: userModel.id },
      body: userModel
    }
    jest
      .spyOn(containerFixture.repository, 'update')
      .mockResolvedValue(Result.ok(true))
    sut = new UpdateUser(containerFixture)
  })

  it('Should call updateRepository with correct values', async () => {
    await sut.execute(httpRequest)
    expect(containerFixture.repository.update).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id,
      httpRequest.body
    )
  })

  it('Should return status code 404 if data was not found', async () => {
    const err = ErrorEntity.notFound()
    jest
      .spyOn(containerFixture.repository, 'update')
      .mockResolvedValueOnce(Result.fail(err))
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(resultErrorHandler(err))
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(noContent())
  })
})
