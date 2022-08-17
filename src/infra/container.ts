import { Dependencies } from '@/application/protocols'
import { BaseRepository } from './databases/typeorm/repositories'
import { PinoLoggerAdapter } from './monitoration/pino-logger.adapter'
import { JoiAdapter } from './validators/joi.adapter'

export default class Container {
  private constructor(readonly dependencies: Dependencies.Container) {}

  static async init(): Promise<Container> {
    const validation = await JoiAdapter.init()
    return new Container({
      logger: new PinoLoggerAdapter(),
      repository: new BaseRepository(),
      validation
    })
  }
}
