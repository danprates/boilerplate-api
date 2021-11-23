import { ErrorModel } from '@/domain/models/error.model'
import { HttpResponse } from '../protocols'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (message = 'Bad Request'): HttpResponse => ({
  statusCode: 400,
  body: { message, type: 'BAD_REQUEST' }
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: { message: 'Unauthorized', type: 'UNAUTHORIZED' }
})

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: { message: 'Not found', type: 'NOT_FOUND' }
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: { message: 'Server error', type: 'SERVER_ERROR' }
})

export const resultErrorHandler = (err?: ErrorModel): HttpResponse => ({
  body: { message: err?.message ?? 'Unexpected error' },
  statusCode: err?.code ?? 500
})
