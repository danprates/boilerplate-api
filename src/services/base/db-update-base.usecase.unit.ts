import { BaseModel, BaseModelFixture, Result } from '@/domain/models'
import { UpdateRepository } from '../protocols'
import { DbUpdateBase } from './db-update-base.usecase'

interface SutTypes {
  sut: DbUpdateBase
  updateRepository: UpdateRepository
  baseModel: BaseModel
}

const makeSut = (): SutTypes => {
  const baseModel = BaseModelFixture()
  const updateRepository: UpdateRepository = { update: jest.fn().mockResolvedValue(Result.ok(true)) }
  const sut = new DbUpdateBase(updateRepository)

  return {
    sut,
    baseModel,
    updateRepository
  }
}

describe('DbUpdateBase Usecase', () => {
  it('Should call UpdateRepository with correct values', async () => {
    const { sut, updateRepository, baseModel } = makeSut()
    await sut.update('any_id', baseModel)
    expect(updateRepository.update).toHaveBeenNthCalledWith(1, 'any_id', baseModel)
  })

  it('Should throw error when UpdateRepository throws', async () => {
    const { sut, updateRepository } = makeSut()
    jest.spyOn(updateRepository, 'update').mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.update(null as any, null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return fail result when UpdateRepository return fail', async () => {
    const { sut, updateRepository, baseModel } = makeSut()
    jest.spyOn(updateRepository, 'update').mockResolvedValueOnce(Result.fail('any_fail'))
    const promise = await sut.update(baseModel.id, baseModel)
    expect(promise.isFailure).toBeTruthy()
    expect(promise.error).toEqual('any_fail')
  })

  it('Should return true when everything is ok', async () => {
    const { sut, baseModel } = makeSut()
    const result = await sut.update(baseModel.id, baseModel)
    expect(result).toEqual(Result.ok(true))
  })
})
