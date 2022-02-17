import { ErrorModel, Result } from '@/domain/models'
import { SoftDeleteRepository } from '@/domain/protocols'
import { DbSoftDeleteBase } from './db-soft-delete-base.usecase'

interface SutTypes {
  sut: DbSoftDeleteBase
  softDeleteRepository: SoftDeleteRepository
}

const makeSut = (): SutTypes => {
  const softDeleteRepository: SoftDeleteRepository = {
    softDelete: jest.fn().mockResolvedValue(true)
  }
  const sut = new DbSoftDeleteBase({ deleteRepository: softDeleteRepository })

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

  it('Should return fail when not found', async () => {
    const { sut, softDeleteRepository } = makeSut()
    jest.spyOn(softDeleteRepository, 'softDelete').mockResolvedValueOnce(false)
    const result = await sut.delete(null as any)
    expect(result).toEqual(Result.fail(ErrorModel.notFound()))
  })

  it('Should return true when everything is ok', async () => {
    const { sut } = makeSut()
    const result = await sut.delete('any_id')
    expect(result).toEqual(Result.ok(true))
  })
})
