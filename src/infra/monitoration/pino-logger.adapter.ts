import { Logger } from '@/domain/protocols'
import { APP_NAME, LOG_LEVEL } from '@/main/config/env.config'
import { pino } from 'pino'

export class PinoLoggerAdapter implements Logger {
  private readonly logger: pino.Logger

  constructor(name?: string) {
    this.logger = pino({
      name: name ?? APP_NAME,
      level: LOG_LEVEL
    })
  }

  debug(message: string, object: any = {}): void {
    this.logger.debug(object, message)
  }

  info(message: string, object: any = {}): void {
    this.logger.info(object, message)
  }

  warn(message: string, object: any = {}): void {
    this.logger.warn(object, message)
  }

  error(message: string, object: any = {}): void {
    this.logger.error(object, message)
  }

  fatal(message: string, object: any = {}): void {
    this.logger.fatal(object, message)
  }
}
