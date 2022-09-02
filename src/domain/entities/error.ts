export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  SERVER_ERROR = 500
}

export enum ErrorMessages {
  NOT_FOUND = 'Resource Not found',
  INVALID_PARAMS = 'Invalid params are provided',
  UNAUTHORIZED = 'Request unauthorized',
  CONFLICT = 'Conflict',
  UNPROCESSABLE_ENTITY = 'Unprocessable entity',
  SERVER_ERROR = 'Server error'
}

export class ErrorEntity extends Error {
  private constructor(
    readonly message: string = 'Server error',
    readonly code: number = 500
  ) {
    super(message)
  }

  static notFound(message?: string): ErrorEntity {
    return new ErrorEntity(
      message ?? ErrorMessages.NOT_FOUND,
      ErrorCode.NOT_FOUND
    )
  }

  static invalidParams(message?: string): ErrorEntity {
    return new ErrorEntity(
      message ?? ErrorMessages.INVALID_PARAMS,
      ErrorCode.BAD_REQUEST
    )
  }

  static unauthorized(message?: string): ErrorEntity {
    return new ErrorEntity(
      message ?? ErrorMessages.UNAUTHORIZED,
      ErrorCode.UNAUTHORIZED
    )
  }

  static fromStatusCode(status = 500, message?: string): ErrorEntity {
    const code = ErrorCode[status] ?? 'SERVER_ERROR'
    return new ErrorEntity(message ?? ErrorMessages[code], ErrorCode[code])
  }
}
