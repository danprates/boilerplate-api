import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel, Result } from '@/application/models'
import { UserModel } from '@/application/models/user.model'
import { Domain } from '@/application/protocols'
import UpdateUser from '@/application/use-cases/update-user'
import { containerFixture } from '@/tests/infra/container.fixture'
import { UserModelFixture } from '../../fixtures/user.model.fixture'

describe('UpdateUser Controller', () => {
  let userModel: UserModel = UserModelFixture()
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
    const err = ErrorModel.notFound()
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

  it('Should return status code 500 if any dependency throws', async () => {
    const error = new Error('any_error')

    jest
      .spyOn(containerFixture.repository, 'update')
      .mockRejectedValueOnce(error)
    expect(await sut.execute(httpRequest)).toEqual(serverError())
  })
})
