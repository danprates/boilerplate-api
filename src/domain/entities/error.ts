export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404
}

export enum ErrorMessages {
  NOT_FOUND = 'Resource Not found',
  INVALID_PARAMS = 'Invalid params are provided',
  UNAUTHORIZED = 'Request unauthorized'
}

export class ErrorEntity {
  private constructor(
    public readonly message: string,
    public readonly code: number
  ) {}

  public static notFound(message?: string): ErrorEntity {
    return new ErrorEntity(
      message ?? ErrorMessages.NOT_FOUND,
      ErrorCode.NOT_FOUND
    )
  }

  public static invalidParams(message?: string): ErrorEntity {
    return new ErrorEntity(
      message ?? ErrorMessages.INVALID_PARAMS,
      ErrorCode.BAD_REQUEST
    )
  }

  public static unauthorized(message?: string): ErrorEntity {
    return new ErrorEntity(
      message ?? ErrorMessages.UNAUTHORIZED,
      ErrorCode.UNAUTHORIZED
    )
  }
}
