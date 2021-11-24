export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum ErrorMessages {
  NOT_FOUND = 'Resource Not found',
  INVALID_PARAMS = 'Invalid params are provided',
  UNAUTHORIZED = 'Request unauthorized'
}

export class ErrorModel {
  private constructor (public readonly message: string, public readonly code: number) {}

  public static notFound (message?: string): ErrorModel {
    return new ErrorModel(message ?? ErrorMessages.NOT_FOUND, ErrorCode.NOT_FOUND)
  }

  public static invalidParams (message?: string): ErrorModel {
    return new ErrorModel(message ?? ErrorMessages.INVALID_PARAMS, ErrorCode.BAD_REQUEST)
  }

  public static unauthorized (message?: string): ErrorModel {
    return new ErrorModel(message ?? ErrorMessages.UNAUTHORIZED, ErrorCode.UNAUTHORIZED)
  }
}
