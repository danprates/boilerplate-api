import { DeleteBaseController } from '@/application/controllers/base'
import { Controller } from '@/application/protocols'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

export const deleteUserFactory = (): Controller => {
  const schema = Joi.object({
    body: Joi.allow(),
    query: Joi.allow(),
    params: Joi.object({
      id: Joi.string().uuid().trim().required()
    })
  })
  const validation = new JoiAdapter(schema)

  const deleteRepository = new BaseRepository(UserEntity)
  return new DeleteBaseController({
    deleteRepository,
    validation,
    logger: new PinoLoggerAdapter('[DELETE_USER]')
  })
}
