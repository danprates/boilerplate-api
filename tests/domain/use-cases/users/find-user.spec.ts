import { ErrorEntity } from '@/domain/entities'
import { Response } from '@/domain/entities/response'
import { User } from '@/domain/entities/user'
import { Domain } from '@/domain/protocols'
import FindUser from '@/domain/use-cases/find-user'
import { containerFixture } from '@/tests/infra/container.fixture'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

describe('FindUser use case', () => {
  let userModel: User
  let httpRequest: Domain.Request
  let sut: FindUser

  beforeEach(() => {
    userModel = UserModelFixture()
    httpRequest = { params: { id: userModel.id } }
    jest.spyOn(containerFixture.repository, 'find').mockResolvedValue(userModel)
    sut = new FindUser(containerFixture)
  })

  it('Should call findRepository with correct values', async () => {
    await sut.execute(httpRequest)
    expect(containerFixture.repository.find).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id
    )
  })

  it('Should throw not found error if data was not found', async () => {
    jest.spyOn(containerFixture.repository, 'find').mockResolvedValueOnce(null)
    await expect(sut.execute(httpRequest)).rejects.toThrowError(
      ErrorEntity.notFound('User not found')
    )
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(Response.ok(userModel))
  })
})
