import { ErrorEntity } from '@/domain/entities'
import BaseSchema from '@/infra/validators/base-schema'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

class TestSchema extends BaseSchema {
  constructor() {
    super('Test')
  }

  getSchema(): Joi.Schema {
    return Joi.object({ body: { foo: Joi.number().required() } })
  }
}

describe('JoiAdapter', () => {
  let sut: JoiAdapter

  beforeAll(async () => {
    sut = await JoiAdapter.init()
    sut.addSchema(new TestSchema())
  })

  it('should return a result ok when passed correct data', () => {
    const result = sut.check({ body: { foo: 123 } }, 'Test')
    expect(result).toEqual({ body: { foo: 123 } })
  })

  it('should convert data when its possible', () => {
    const result = sut.check({ body: { foo: '123' } }, 'Test')
    expect(result).toEqual({ body: { foo: 123 } })
  })

  it('should return a result fail when passed incorrect data', () => {
    const err = ErrorEntity.invalidParams('"body.foo" is required')
    expect(() => sut.check({ body: { foo: undefined } }, 'Test')).toThrowError(
      err
    )
  })
})