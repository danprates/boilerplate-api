import { ErrorCode, ErrorEntity, ErrorMessages } from '@/domain/entities/error'

describe('Error model', () => {
  it('should return notFound error', () => {
    expect(ErrorEntity.notFound()).toEqual({
      code: ErrorCode.NOT_FOUND,
      message: ErrorMessages.NOT_FOUND
    })

    expect(ErrorEntity.notFound('any_message')).toEqual({
      code: ErrorCode.NOT_FOUND,
      message: 'any_message'
    })
  })

  it('should return invalidParams error', () => {
    expect(ErrorEntity.invalidParams()).toEqual({
      code: ErrorCode.BAD_REQUEST,
      message: ErrorMessages.INVALID_PARAMS
    })

    expect(ErrorEntity.invalidParams('any_message')).toEqual({
      code: ErrorCode.BAD_REQUEST,
      message: 'any_message'
    })
  })

  it('should return unauthorized error', () => {
    expect(ErrorEntity.unauthorized()).toEqual({
      code: ErrorCode.UNAUTHORIZED,
      message: ErrorMessages.UNAUTHORIZED
    })

    expect(ErrorEntity.unauthorized('any_message')).toEqual({
      code: ErrorCode.UNAUTHORIZED,
      message: 'any_message'
    })
  })

  it('should return correct error from status code', () => {
    expect(ErrorEntity.fromStatusCode(404, 'Resource not found')).toEqual({
      code: ErrorCode.NOT_FOUND,
      message: 'Resource not found'
    })

    expect(ErrorEntity.fromStatusCode(undefined)).toEqual({
      code: ErrorCode.SERVER_ERROR,
      message: ErrorMessages.SERVER_ERROR
    })

    expect(ErrorEntity.fromStatusCode(1321321321321)).toEqual({
      code: ErrorCode.SERVER_ERROR,
      message: ErrorMessages.SERVER_ERROR
    })
  })
})
