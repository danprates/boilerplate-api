import { ListUserInputDTO } from '@/application/dtos'
import { ok, serverError } from '@/application/helpers'
import { Result } from '@/application/models'
import { UserModel } from '@/application/models/user.model'
import ListUsers from '@/application/use-cases/list-users'
import { containerFixture } from '@/tests/infra/container.fixture'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

describe('ListUsers Controller', () => {
  let userModel: UserModel
  const httpRequest: ListUserInputDTO = {}
  let sut = new ListUsers(containerFixture)

  beforeEach(() => {
    userModel = UserModelFixture()
    jest
      .spyOn(containerFixture.repository, 'list')
      .mockResolvedValue(Result.ok({ data: [userModel], total: 1 }) as any)
    sut = new ListUsers(containerFixture)
  })

  it('Should call listRepository with correct values', async () => {
    await sut.execute(httpRequest)
    expect(containerFixture.repository.list).toHaveBeenNthCalledWith(
      1,
      httpRequest.query
    )
  })

  it('Should return status code 200 when correct params are provided', async () => {
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(ok({ data: [userModel], total: 1 }))
  })

  it('Should return status code 500 if any dependency throws', async () => {
    const error = new Error('any_error')

    jest.spyOn(containerFixture.repository, 'list').mockRejectedValueOnce(error)
    expect(await sut.execute(httpRequest)).toEqual(serverError())
  })
})
