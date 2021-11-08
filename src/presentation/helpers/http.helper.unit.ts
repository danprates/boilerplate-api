import { badRequest, created, noContent, notFound, ok, serverError, unauthorized } from '.'

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
    const error = new Error('any_error')
    expect(serverError(error)).toEqual({
      body: { message: 'Server error', stack: error.stack, type: 'SERVER_ERROR' },
      statusCode: 500
    })
  })
})
