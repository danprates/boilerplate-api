import { ErrorCode, ErrorMessages, ErrorModel } from './error.model'

describe('Error model', () => {
  it('should return notFound error', () => {
    expect(ErrorModel.notFound()).toEqual({
      code: ErrorCode.NOT_FOUND,
      messages: ErrorMessages.NOT_FOUND
    })

    expect(ErrorModel.notFound('any_message')).toEqual({
      code: ErrorCode.NOT_FOUND,
      messages: 'any_message'
    })
  })
})
