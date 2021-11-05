import { SoftDeleteRepository } from '../protocols'
import { DbSoftDeleteBase } from './db-soft-delete-base.usecase'

interface SutTypes {
  sut: DbSoftDeleteBase
  softDeleteRepository: SoftDeleteRepository
}

const makeSut = (): SutTypes => {
  const softDeleteRepository: SoftDeleteRepository = {
    softDelete: jest.fn().mockResolvedValue(true)
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

  it('Should thow error when SoftDeleteRepository throws', async () => {
    const { sut, softDeleteRepository } = makeSut()
    jest
      .spyOn(softDeleteRepository, 'softDelete')
      .mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.delete(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return false when data was not found', async () => {
    const { sut, softDeleteRepository } = makeSut()
    jest.spyOn(softDeleteRepository, 'softDelete').mockResolvedValueOnce(null as any)
    const result = await sut.delete('wrong_id')
    expect(result).toBeFalsy()
  })

  it('Should return true when everything is ok', async () => {
    const { sut } = makeSut()
    const result = await sut.delete('any_id')
    expect(result).toBeTruthy()
  })
})
