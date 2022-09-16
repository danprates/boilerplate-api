import { ErrorEntity, Result } from '@/domain/entities'
import { vi } from 'vitest'

describe('Result model', () => {
  it('should return a success return when ok is called', () => {
    const result = Result.ok('success')
    expect(result.isSuccess).toBeTruthy()
    expect(result.isFailure).toBeFalsy()
    expect(result.getValue()).toEqual('success')
  })

  it('should return a failed return when fail is called', () => {
    const result = Result.fail(ErrorEntity.invalidParams('failed'))
    expect(result.isFailure).toBeTruthy()
    expect(result.isSuccess).toBeFalsy()
    expect(result.error).toEqual(ErrorEntity.invalidParams('failed'))
  })

  it('should throw a error when call getValue from a failed result', () => {
    const result = Result.fail(ErrorEntity.invalidParams('failed'))
    expect(result.isFailure).toBeTruthy()
    expect(() => result.getValue()).toThrow(
      'Cant retrieve the value from a failed result.'
    )
  })

  it('should throw error when result isSuccess and have error', () => {
    vi.spyOn(Result, 'fail').mockImplementationOnce((error) => {
      // @ts-expect-error
      return new Result(true, error)
    })
    expect(() => Result.fail(ErrorEntity.invalidParams('some error'))).toThrow(
      'InvalidOperation: A result cannot be successful and contain an error'
    )
  })

  it('should throw error when result failed dont have a message', () => {
    vi.spyOn(Result, 'fail').mockImplementationOnce(() => {
      // @ts-expect-error
      return new Result(undefined, undefined)
    })
    expect(() => Result.fail(ErrorEntity.invalidParams('some error'))).toThrow(
      'InvalidOperation: A failing result needs to contain an error message'
    )
  })
})
