import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'
import { vi } from 'vitest'

const pinoMock = {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  fatal: vi.fn()
}

vi.mock('pino', () => {
  return {
    pino: vi.fn().mockImplementation(() => pinoMock)
  }
})

describe('PinoLoggerAdapter', () => {
  it('should call debug with correct values', () => {
    const sut = new PinoLoggerAdapter()
    sut.debug('debug_message')
    expect(pinoMock.debug).toHaveBeenNthCalledWith(
      1,
      {},
      '[APP]: debug_message'
    )
  })

  it('should call info with correct values', () => {
    const sut = new PinoLoggerAdapter('any_name')
    sut.info('info_message')
    expect(pinoMock.info).toHaveBeenNthCalledWith(1, {}, '[APP]: info_message')
  })

  it('should call warn with correct values', () => {
    const sut = new PinoLoggerAdapter('any_name')
    sut.warn('warn_message')
    expect(pinoMock.warn).toHaveBeenNthCalledWith(1, {}, '[APP]: warn_message')
  })

  it('should call error with correct values', () => {
    const sut = new PinoLoggerAdapter('any_name')
    sut.error('error_message')
    expect(pinoMock.error).toHaveBeenNthCalledWith(
      1,
      {},
      '[APP]: error_message'
    )
  })

  it('should call fatal with correct values', () => {
    const sut = new PinoLoggerAdapter('any_name')
    sut.fatal('fatal_message')
    expect(pinoMock.fatal).toHaveBeenNthCalledWith(
      1,
      {},
      '[APP]: fatal_message'
    )
  })
})
