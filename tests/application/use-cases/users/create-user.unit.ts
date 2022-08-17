import { created, serverError } from '@/application/helpers'
import { Result } from '@/application/models'
import { Domain } from '@/application/protocols'
import CreateUser from '@/application/use-cases/create-user'
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
      .mockResolvedValue(Result.ok(userModel))
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

  it('Should return status code 500 if any dependency throws', async () => {
    const error = new Error('any_error')

    jest
      .spyOn(containerFixture.repository, 'create')
      .mockRejectedValueOnce(error)
    expect(await sut.execute(httpRequest)).toEqual(serverError())
  })
})
