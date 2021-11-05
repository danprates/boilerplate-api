import { Result } from './result.model'

describe('Result model', () => {
  it('should return a success return when ok is called', () => {
    const result = Result.ok('success')
    expect(result.isSuccess).toBeTruthy()
    expect(result.isFailure).toBeFalsy()
    expect(result.getValue()).toEqual('success')
  })

  it('should return a failed return when fail is called', () => {
    const result = Result.fail('failed')
    expect(result.isFailure).toBeTruthy()
    expect(result.isSuccess).toBeFalsy()
    expect(result.error).toEqual('failed')
  })

  it('should throw a error when call getValue from a failed result', () => {
    const result = Result.fail('failed')
    expect(result.isFailure).toBeTruthy()
    expect(result.getValue).toThrow("Cannot read property 'isSuccess' of undefined")
  })
})
