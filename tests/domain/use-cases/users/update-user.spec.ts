import { Response } from '@/domain/entities/response'
import { User } from '@/domain/entities/user'
import { Domain } from '@/domain/protocols'
import UpdateUser from '@/domain/use-cases/update-user'
import { containerFixture } from '@/tests/infra/container.fixture'
import { vi } from 'vitest'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

describe('UpdateUser use case', () => {
  let userModel: User = UserModelFixture()
  let httpRequest: Domain.Request
  let sut: UpdateUser

  beforeEach(() => {
    userModel = UserModelFixture()
    httpRequest = {
      params: { id: userModel.id },
      body: userModel
    }
    vi.spyOn(containerFixture.repository, 'update').mockResolvedValue(true)
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

  it('Should return status code 204 when correct params are provided', async () => {
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(Response.noContent())
  })
})
