import { Response } from '@/domain/entities/response'
import { User } from '@/domain/entities/user'
import { Domain } from '@/domain/protocols'
import ListUsers from '@/domain/use-cases/list-users'
import { containerFixture } from '@/tests/infra/container.fixture'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

describe('ListUsers use case', () => {
  let userModel: User
  const httpRequest: Domain.Request = {}
  let sut = new ListUsers(containerFixture)

  beforeEach(() => {
    userModel = UserModelFixture()
    jest
      .spyOn(containerFixture.repository, 'list')
      .mockResolvedValue({ data: [userModel], total: 1 } as any)
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
    expect(result).toEqual(Response.ok({ data: [userModel], total: 1 }))
  })
})
