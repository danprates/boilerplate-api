import { ErrorModel } from '@/application/models'
import { HttpResponse } from '@/application/protocols'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: { message: 'Server error' }
})

export const resultErrorHandler = (err?: ErrorModel): HttpResponse => ({
  body: { message: err?.message ?? 'Unexpected error' },
  statusCode: err?.code ?? 500
})
