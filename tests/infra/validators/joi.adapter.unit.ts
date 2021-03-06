import { ErrorModel } from '@/application/models'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

describe('JoiAdapter', () => {
  it('should return a result ok when passed correct data', () => {
    const schema = Joi.object({ foo: Joi.string().required() })
    const sut = new JoiAdapter(schema)
    const result = sut.run({ foo: 'bar' })
    expect(result.isSuccess).toBeTruthy()
    expect(result.getValue()).toEqual({ foo: 'bar' })
  })

  it('should convert data when its possible', () => {
    const schema = Joi.object({ foo: Joi.number().required() })
    const sut = new JoiAdapter(schema)
    const result = sut.run({ foo: '123' })
    expect(result.isSuccess).toBeTruthy()
    expect(result.getValue()).toEqual({ foo: 123 })
  })

  it('should return a result fail when passed incorrect data', () => {
    const schema = Joi.object({ foo: Joi.string().required() })
    const sut = new JoiAdapter(schema)
    const result = sut.run({ foo: undefined })
    expect(result.isSuccess).toBeFalsy()
    expect(result.error).toEqual(ErrorModel.invalidParams('"foo" is required'))
  })
})
