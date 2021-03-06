import { FindUserController } from '@/application/controllers/users'
import { Controller } from '@/application/protocols'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

export const findUsersFactory = (): Controller => {
  const schema = Joi.object({
    body: Joi.allow(),
    query: Joi.allow(),
    params: Joi.object({
      id: Joi.string().uuid().trim().required()
    })
  })
  const validation = new JoiAdapter(schema)

  const findRepository = new BaseRepository(UserEntity)
  return new FindUserController({
    findRepository,
    validation,
    logger: new PinoLoggerAdapter('[FIND_USER]')
  })
}
