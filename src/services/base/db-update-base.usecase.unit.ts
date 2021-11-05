import { BaseModel } from '@/domain/models'
import { UpdateRepository } from '../protocols'
import { DbUpdateBase } from './db-update-base.usecase'

interface SutTypes {
  sut: DbUpdateBase
  updateRepository: UpdateRepository
  baseModel: BaseModel
}

const makeSut = (): SutTypes => {
  const baseModel = { id: 'some_id', createdAt: new Date(), updatedAt: new Date() }
  const updateRepository: UpdateRepository = { update: jest.fn().mockResolvedValue(true) }
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

  it('Should thow error when UpdateRepository throws', async () => {
    const { sut, updateRepository } = makeSut()
    jest.spyOn(updateRepository, 'update').mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.update(null as any, null as any)
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should return false when data was not found', async () => {
    const { sut, updateRepository } = makeSut()
    jest.spyOn(updateRepository, 'update').mockResolvedValueOnce(null as any)
    const result = await sut.update('wrong_id', null as any)
    expect(result).toBeFalsy()
  })

  it('Should return true when everything is ok', async () => {
    const { sut } = makeSut()
    const result = await sut.update('any_id', null as any)
    expect(result).toBeTruthy()
  })
})
