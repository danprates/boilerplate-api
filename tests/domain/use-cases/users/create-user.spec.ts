import { created } from '@/domain/helpers'
import { Domain } from '@/domain/protocols'
import CreateUser from '@/domain/use-cases/create-user'
import { containerFixture } from '@/tests/infra/container.fixture'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

describe('CreateUser Controller', () => {
  let sut: CreateUser
  let userModel
  let httpRequest: Domain.Request

  beforeEach(() => {
    userModel = UserModelFixture()
    httpRequest = {
      body: {
        name: userModel.name,
        email: userModel.email,
        password: userModel.password
      }
    }
    jest
      .spyOn(containerFixture.repository, 'create')
      .mockResolvedValue(userModel)
    sut = new CreateUser(containerFixture)
  })

  it('Should call createRepository with correct values', async () => {
    await sut.execute(httpRequest)
    expect(containerFixture.repository.create).toHaveBeenNthCalledWith(
      1,
      httpRequest.body
    )
  })

  it('Should return status code 201 when correct params are provided', async () => {
    const result = await sut.execute(httpRequest)
    expect(result).toEqual(created(userModel))
  })
})
