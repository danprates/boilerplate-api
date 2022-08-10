import { Dependencies } from '@/application/protocols'
import { PinoLoggerAdapter } from './monitoration/pino-logger.adapter'

export const container: Dependencies.Container = {
  logger: new PinoLoggerAdapter()
}
