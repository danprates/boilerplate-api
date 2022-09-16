import { Dependencies } from '@/domain/protocols'
import { APP_NAME, LOG_LEVEL } from '@/infra/config/env.config'
import { pino } from 'pino'

export class PinoLoggerAdapter implements Dependencies.Logger {
  private readonly logger: pino.Logger

  constructor(name?: string) {
    this.logger = pino({
      name: name ?? APP_NAME,
      level: LOG_LEVEL
    })
  }

  debug(message: string, values: any = {}, useCaseName: string = 'APP'): void {
    this.logger.debug(values, `[${useCaseName}]: ${message}`)
  }

  info(message: string, values: any = {}, useCaseName: string = 'APP'): void {
    this.logger.info(values, `[${useCaseName}]: ${message}`)
  }

  warn(message: string, values: any = {}, useCaseName: string = 'APP'): void {
    this.logger.warn(values, `[${useCaseName}]: ${message}`)
  }

  error(message: string, values: any = {}, useCaseName: string = 'APP'): void {
    this.logger.error(values, `[${useCaseName}]: ${message}`)
  }

  fatal(message: string, values: any = {}, useCaseName: string = 'APP'): void {
    this.logger.fatal(values, `[${useCaseName}]: ${message}`)
  }
}
