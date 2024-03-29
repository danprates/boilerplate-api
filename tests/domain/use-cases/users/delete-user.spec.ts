import { Response } from '@/domain/entities/response'
import { Domain } from '@/domain/protocols'
import DeleteUser from '@/domain/use-cases/delete-user'
import { containerFixture } from '@/tests/infra/container.fixture'
import { vi } from 'vitest'

describe('DeleteUser use case', () => {
  const httpRequest: Domain.Request = { params: { id: 'any_name' } }
  let sut: DeleteUser

  beforeEach(() => {
    vi.spyOn(containerFixture.repository, 'softDelete').mockResolvedValue(true)
    sut = new DeleteUser(containerFixture)
  })

  it('Should call deleteRepository with correct values', async () => {
    await sut.execute(httpRequest)
    expect(containerFixture.repository.softDelete).toHaveBeenNthCalledWith(
      1,
      httpRequest.params.id
    )
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(Response.noContent())
  })
})
