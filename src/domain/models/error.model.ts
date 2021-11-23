export enum ErrorCode {
  NOT_FOUND = 404,
}

export enum ErrorMessages {
  NOT_FOUND = 'Resource Not found',
}

export class ErrorModel {
  private constructor (public readonly messages: string | string[], public readonly code: number) {}

  public static notFound (message?: string): ErrorModel {
    return new ErrorModel(message ?? ErrorMessages.NOT_FOUND, ErrorCode.NOT_FOUND)
  }
}
