import { ErrorEntity } from '@/domain/entities'
import { Domain } from '@/domain/protocols'

export const ok = (data: any): Domain.Response => ({
  statusCode: 200,
  data
})

export const created = (data: any): Domain.Response => ({
  statusCode: 201,
  data
})

export const noContent = (): Domain.Response => ({
  statusCode: 204,
  data: null
})

export const serverError = (): Domain.Response => ({
  statusCode: 500,
  data: { message: 'Server error' }
})

export const resultErrorHandler = (err?: ErrorEntity): Domain.Response => ({
  data: { message: err?.message ?? 'Unexpected error' },
  statusCode: err?.code ?? 500
})
