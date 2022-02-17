import { ErrorModel, Result } from '@/application/models'
import { HardDeleteRepository } from '@/application/protocols'
import { DbHardDeleteBase } from './db-hard-delete-base.usecase'

interface SutTypes {
  sut: DbHardDeleteBase
  hardDeleteRepository: HardDeleteRepository
}

const makeSut = (): SutTypes => {
  const hardDeleteRepository: HardDeleteRepository = {
    hardDelete: jest.fn().mockResolvedValue(true)
  }
  const sut = new DbHardDeleteBase({ deleteRepository: hardDeleteRepository })

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
    jest
      .spyOn(hardDeleteRepository, 'hardDelete')
      .mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.delete(null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return fail when not found', async () => {
    const { sut, hardDeleteRepository } = makeSut()
    jest.spyOn(hardDeleteRepository, 'hardDelete').mockResolvedValueOnce(false)
    const result = await sut.delete(null as any)
    expect(result).toEqual(Result.fail(ErrorModel.notFound()))
  })

  it('Should return true when everything is ok', async () => {
    const { sut } = makeSut()
    const result = await sut.delete('any_id')
    expect(result).toEqual(Result.ok(true))
  })
})
