import { ErrorModel } from '@/domain/models/error.model'
import { badRequest, created, noContent, notFound, ok, resultErrorHandler, serverError, unauthorized } from '.'

describe('HTTPHelper', () => {
  it('should return correct values when ok is called', () => {
    expect(ok('any_data')).toEqual({ body: 'any_data', statusCode: 200 })
  })

  it('should return correct values when created is called', () => {
    expect(created('any_data')).toEqual({ body: 'any_data', statusCode: 201 })
  })

  it('should return correct values when badRequest is called', () => {
    expect(badRequest('any_error')).toEqual({
      body: { message: 'any_error', type: 'BAD_REQUEST' },
      statusCode: 400
    })
  })

  it('should return correct values when badRequest is called without a message', () => {
    expect(badRequest()).toEqual({
      body: { message: 'Bad Request', type: 'BAD_REQUEST' },
      statusCode: 400
    })
  })

  it('should return correct values when noContent is called', () => {
    expect(noContent()).toEqual({ body: null, statusCode: 204 })
  })

  it('should return correct values when unauthorized is called', () => {
    expect(unauthorized()).toEqual({
      body: { message: 'Unauthorized', type: 'UNAUTHORIZED' },
      statusCode: 401
    })
  })

  it('should return correct values when notFound is called', () => {
    expect(notFound()).toEqual({
      body: { message: 'Not found', type: 'NOT_FOUND' },
      statusCode: 404
    })
  })

  it('should return correct values when serverError is called', () => {
    expect(serverError()).toEqual({
      body: { message: 'Server error', type: 'SERVER_ERROR' },
      statusCode: 500
    })
  })

  it('should return correct values when resultErrorHandler is called', () => {
    const err = ErrorModel.notFound()
    expect(resultErrorHandler(err)).toEqual({
      body: { message: err.message },
      statusCode: err.code
    })
  })

  it('should return default values when resultErrorHandler is called without any error', () => {
    expect(resultErrorHandler()).toEqual({
      body: { message: 'Unexpected error' },
      statusCode: 500
    })
  })
})
