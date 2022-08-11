import {
  created,
  noContent,
  ok,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel } from '@/application/models'

describe('HTTPHelper', () => {
  it('should return correct values when ok is called', () => {
    expect(ok('any_data')).toEqual({ data: 'any_data', statusCode: 200 })
  })

  it('should return correct values when created is called', () => {
    expect(created('any_data')).toEqual({ data: 'any_data', statusCode: 201 })
  })

  it('should return bad request when ErrorModel.invalidParams is called', () => {
    let err = ErrorModel.invalidParams('any_error')

    expect(resultErrorHandler(err)).toEqual({
      data: { message: err.message },
      statusCode: 400
    })

    err = ErrorModel.invalidParams()
    expect(resultErrorHandler(err)).toEqual({
      data: { message: err.message },
      statusCode: 400
    })
  })

  it('should return correct values when noContent is called', () => {
    expect(noContent()).toEqual({ data: null, statusCode: 204 })
  })

  it('should return correct values when unauthorized is called', () => {
    let err = ErrorModel.unauthorized('any_error')

    expect(resultErrorHandler(err)).toEqual({
      data: { message: err.message },
      statusCode: 401
    })

    err = ErrorModel.unauthorized()
    expect(resultErrorHandler(err)).toEqual({
      data: { message: err.message },
      statusCode: 401
    })
  })

  it('should return correct values when notFound is called', () => {
    let err = ErrorModel.notFound('any_error')
    expect(resultErrorHandler(err)).toEqual({
      data: { message: err.message },
      statusCode: 404
    })

    err = ErrorModel.notFound()
    expect(resultErrorHandler(err)).toEqual({
      data: { message: err.message },
      statusCode: 404
    })
  })

  it('should return correct values when serverError is called', () => {
    expect(serverError()).toEqual({
      data: { message: 'Server error' },
      statusCode: 500
    })
  })

  it('should return default values when resultErrorHandler is called without any error', () => {
    expect(resultErrorHandler()).toEqual({
      data: { message: 'Unexpected error' },
      statusCode: 500
    })
  })
})
