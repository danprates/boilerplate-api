import { ErrorCode, ErrorMessages, ErrorModel } from './error.model'

describe('Error model', () => {
  it('should return notFound error', () => {
    expect(ErrorModel.notFound()).toEqual({
      code: ErrorCode.NOT_FOUND,
      messages: ErrorMessages.NOT_FOUND
    })

    expect(ErrorModel.notFound('any_message')).toEqual({
      code: ErrorCode.NOT_FOUND,
      messages: 'any_message'
    })
  })

  it('should return invalidParams error', () => {
    expect(ErrorModel.invalidParams()).toEqual({
      code: ErrorCode.BAD_REQUEST,
      messages: ErrorMessages.INVALID_PARAMS
    })

    expect(ErrorModel.invalidParams('any_message')).toEqual({
      code: ErrorCode.BAD_REQUEST,
      messages: 'any_message'
    })
  })
})
