export enum ErrorCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum ErrorMessages {
  NOT_FOUND = 'Resource Not found',
  INVALID_PARAMS = 'Invalid params are provided',
}

export class ErrorModel {
  private constructor (public readonly messages: string | string[], public readonly code: number) {}

  public static notFound (message?: string): ErrorModel {
    return new ErrorModel(message ?? ErrorMessages.NOT_FOUND, ErrorCode.NOT_FOUND)
  }

  public static invalidParams (messages?: string | string[]): ErrorModel {
    return new ErrorModel(messages ?? ErrorMessages.INVALID_PARAMS, ErrorCode.BAD_REQUEST)
  }
}
