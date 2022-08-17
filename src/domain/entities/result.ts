import { ErrorEntity } from './error'

export class Result<T = any> {
  public isSuccess: boolean
  public isFailure: boolean
  public error?: ErrorEntity
  private readonly _value?: T

  private constructor(isSuccess: boolean, error?: ErrorEntity, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      )
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      )
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this._value = value

    Object.freeze(this)
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value)
  }

  public static fail<U>(error: ErrorEntity): Result<U> {
    return new Result<U>(false, error)
  }

  public getValue(): T | undefined {
    if (!this.isSuccess) {
      throw new Error('Cant retrieve the value from a failed result.')
    }

    return this._value
  }
}
