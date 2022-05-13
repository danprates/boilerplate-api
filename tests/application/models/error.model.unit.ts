import { ErrorModel } from '@/application/models'
import { ErrorCode, ErrorMessages } from '@/application/models/error.model'

describe('Error model', () => {
  it('should return notFound error', () => {
    expect(ErrorModel.notFound()).toEqual({
      code: ErrorCode.NOT_FOUND,
      message: ErrorMessages.NOT_FOUND
    })

    expect(ErrorModel.notFound('any_message')).toEqual({
      code: ErrorCode.NOT_FOUND,
      message: 'any_message'
    })
  })

  it('should return invalidParams error', () => {
    expect(ErrorModel.invalidParams()).toEqual({
      code: ErrorCode.BAD_REQUEST,
      message: ErrorMessages.INVALID_PARAMS
    })

    expect(ErrorModel.invalidParams('any_message')).toEqual({
      code: ErrorCode.BAD_REQUEST,
      message: 'any_message'
    })
  })

  it('should return unauthorized error', () => {
    expect(ErrorModel.unauthorized()).toEqual({
      code: ErrorCode.UNAUTHORIZED,
      message: ErrorMessages.UNAUTHORIZED
    })

    expect(ErrorModel.unauthorized('any_message')).toEqual({
      code: ErrorCode.UNAUTHORIZED,
      message: 'any_message'
    })
  })
})
