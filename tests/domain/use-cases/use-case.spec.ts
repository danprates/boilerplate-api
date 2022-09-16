import { UseCase } from '@/domain/protocols/use-case'

describe('Base Use Case', () => {
  it('should throw error when execute is not implemented', async () => {
    class Sut extends UseCase {}
    const sut = new Sut({} as any)
    await expect(sut.execute({} as any)).rejects.toThrowError(
      'Method not implemented'
    )
  })
})
