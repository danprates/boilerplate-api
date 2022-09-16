import { ErrorCode, ErrorEntity, ErrorMessages } from '@/domain/entities/error'

describe('Error entity', () => {
  let err: ErrorEntity

  it('should return notFound error', () => {
    err = ErrorEntity.notFound()
    expect(err.code).toEqual(ErrorCode.NOT_FOUND)
    expect(err.message).toEqual(ErrorMessages.NOT_FOUND)

    err = ErrorEntity.notFound('any_message')
    expect(err.message).toEqual('any_message')
  })

  it('should return invalidParams error', () => {
    err = ErrorEntity.invalidParams()
    expect(err.code).toEqual(ErrorCode.BAD_REQUEST)
    expect(err.message).toEqual(ErrorMessages.INVALID_PARAMS)

    err = ErrorEntity.invalidParams('any_message')
    expect(err.message).toEqual('any_message')
  })

  it('should return unauthorized error', () => {
    err = ErrorEntity.unauthorized()
    expect(err.code).toEqual(ErrorCode.UNAUTHORIZED)
    expect(err.message).toEqual(ErrorMessages.UNAUTHORIZED)

    err = ErrorEntity.unauthorized('any_message')
    expect(err.code).toEqual(ErrorCode.UNAUTHORIZED)
    expect(err.message).toEqual('any_message')
  })

  it('should return correct error from status code', () => {
    err = ErrorEntity.fromStatusCode(404, 'Resource not found')
    expect(err.code).toEqual(404)
    expect(err.message).toEqual('Resource not found')

    err = ErrorEntity.fromStatusCode(undefined)
    expect(err.code).toEqual(ErrorCode.SERVER_ERROR)
    expect(err.message).toEqual(ErrorMessages.SERVER_ERROR)

    err = ErrorEntity.fromStatusCode(1321321321321)
    expect(err.code).toEqual(ErrorCode.SERVER_ERROR)
    expect(err.message).toEqual(ErrorMessages.SERVER_ERROR)
  })
})
