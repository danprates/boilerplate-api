import { Result } from '@/domain/models'
import { SoftDeleteRepository } from '../../protocols'
import { DbSoftDeleteBase } from './db-soft-delete-base.usecase'

interface SutTypes {
  sut: DbSoftDeleteBase
  softDeleteRepository: SoftDeleteRepository
}

const makeSut = (): SutTypes => {
  const softDeleteRepository: SoftDeleteRepository = {
    softDelete: jest.fn().mockResolvedValue(Result.ok(true))
  }
  const sut = new DbSoftDeleteBase(softDeleteRepository)

  return {
    sut,
    softDeleteRepository
  }
}

describe('DbSoftDeleteBase Usecase', () => {
  it('Should call SoftDeleteRepository with correct values', async () => {
    const { sut, softDeleteRepository } = makeSut()
    await sut.delete('any_id')
    expect(softDeleteRepository.softDelete).toHaveBeenNthCalledWith(1, 'any_id')
  })

  it('Should throw error when SoftDeleteRepository throws', async () => {
    const { sut, softDeleteRepository } = makeSut()
    jest
      .spyOn(softDeleteRepository, 'softDelete')
      .mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.delete(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return fail result when SoftDeleteRepository return fail', async () => {
    const { sut, softDeleteRepository } = makeSut()
    jest.spyOn(softDeleteRepository, 'softDelete').mockResolvedValueOnce(Result.fail('any_fail'))
    const promise = await sut.delete('any_id')
    expect(promise.isFailure).toBeTruthy()
    expect(promise.error).toEqual('any_fail')
  })

  it('Should return true when everything is ok', async () => {
    const { sut } = makeSut()
    const result = await sut.delete('any_id')
    expect(result).toEqual(Result.ok(true))
  })
})
