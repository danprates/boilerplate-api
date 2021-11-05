import { Result } from '@/domain/models'
import { HardDeleteRepository } from '../../protocols'
import { DbHardDeleteBase } from './db-hard-delete-base.usecase'

interface SutTypes {
  sut: DbHardDeleteBase
  hardDeleteRepository: HardDeleteRepository
}

const makeSut = (): SutTypes => {
  const hardDeleteRepository: HardDeleteRepository = {
    hardDelete: jest.fn().mockResolvedValue(Result.ok(true))
  }
  const sut = new DbHardDeleteBase(hardDeleteRepository)

  return {
    sut,
    hardDeleteRepository
  }
}

describe('DbHardDeleteBase Usecase', () => {
  it('Should call HardDeleteRepository with correct values', async () => {
    const { sut, hardDeleteRepository } = makeSut()
    await sut.delete('any_id')
    expect(hardDeleteRepository.hardDelete).toHaveBeenNthCalledWith(1, 'any_id')
  })

  it('Should throw error when HardDeleteRepository throws', async () => {
    const { sut, hardDeleteRepository } = makeSut()
    jest.spyOn(hardDeleteRepository, 'hardDelete').mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.delete(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return fail result when HardDeleteRepository return fail', async () => {
    const { sut, hardDeleteRepository } = makeSut()
    jest.spyOn(hardDeleteRepository, 'hardDelete').mockResolvedValueOnce(Result.fail('any_fail'))
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
