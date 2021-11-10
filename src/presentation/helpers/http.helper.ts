import { HttpResponse } from '../protocols'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (message: string = 'Bad Request'): HttpResponse => ({
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

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: { message: 'Server error', stack: error.stack, type: 'SERVER_ERROR' }
})
