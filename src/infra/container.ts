import { Dependencies } from '@/application/protocols'
import { BaseRepository } from './databases/typeorm/repositories'
import { PinoLoggerAdapter } from './monitoration/pino-logger.adapter'
import { JoiAdapter } from './validators/joi.adapter'

export const container: Dependencies.Container = {
  logger: new PinoLoggerAdapter(),
  repository: new BaseRepository(null),
  validation: new JoiAdapter()
}
