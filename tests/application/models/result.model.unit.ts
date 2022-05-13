import { ErrorModel, Result } from '@/application/models'

describe('Result model', () => {
  it('should return a success return when ok is called', () => {
    const result = Result.ok('success')
    expect(result.isSuccess).toBeTruthy()
    expect(result.isFailure).toBeFalsy()
    expect(result.getValue()).toEqual('success')
  })

  it('should return a failed return when fail is called', () => {
    const result = Result.fail(ErrorModel.invalidParams('failed'))
    expect(result.isFailure).toBeTruthy()
    expect(result.isSuccess).toBeFalsy()
    expect(result.error).toEqual(ErrorModel.invalidParams('failed'))
  })

  it('should throw a error when call getValue from a failed result', () => {
    const result = Result.fail(ErrorModel.invalidParams('failed'))
    expect(result.isFailure).toBeTruthy()
    expect(() => result.getValue()).toThrow(
      'Cant retrieve the value from a failed result.'
    )
  })

  it('should throw error when result isSuccess and have error', () => {
    jest.spyOn(Result, 'fail').mockImplementationOnce((error) => {
      // @ts-expect-error
      return new Result(true, error)
    })
    expect(() => Result.fail(ErrorModel.invalidParams('some error'))).toThrow(
      'InvalidOperation: A result cannot be successful and contain an error'
    )
  })

  it('should throw error when result failed dont have a message', () => {
    jest.spyOn(Result, 'fail').mockImplementationOnce(() => {
      // @ts-expect-error
      return new Result(undefined, undefined)
    })
    expect(() => Result.fail(ErrorModel.invalidParams('some error'))).toThrow(
      'InvalidOperation: A failing result needs to contain an error message'
    )
  })
})
