import { PinoLoggerAdapter } from './pino-logger.adapter'

const pinoMock = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  fatal: jest.fn()
}

jest.mock('pino', () => {
  return {
    pino: jest.fn().mockImplementation(() => pinoMock)
  }
})

describe('PinoLoggerAdapter', () => {
  it('should call debug with correct values', () => {
    const sut = new PinoLoggerAdapter()
    sut.debug('debug_message')
    expect(pinoMock.debug).toHaveBeenNthCalledWith(1, {}, 'debug_message')
  })

  it('should call info with correct values', () => {
    const sut = new PinoLoggerAdapter('any_name')
    sut.info('info_message')
    expect(pinoMock.info).toHaveBeenNthCalledWith(1, {}, 'info_message')
  })

  it('should call warn with correct values', () => {
    const sut = new PinoLoggerAdapter('any_name')
    sut.warn('warn_message')
    expect(pinoMock.warn).toHaveBeenNthCalledWith(1, {}, 'warn_message')
  })

  it('should call error with correct values', () => {
    const sut = new PinoLoggerAdapter('any_name')
    sut.error('error_message')
    expect(pinoMock.error).toHaveBeenNthCalledWith(1, {}, 'error_message')
  })

  it('should call fatal with correct values', () => {
    const sut = new PinoLoggerAdapter('any_name')
    sut.fatal('fatal_message')
    expect(pinoMock.fatal).toHaveBeenNthCalledWith(1, {}, 'fatal_message')
  })
})
