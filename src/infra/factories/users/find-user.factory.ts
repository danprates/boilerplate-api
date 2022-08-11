import { Domain } from '@/application/protocols'
import FindUser from '@/application/use-cases/find-user'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

export const findUsersFactory = (): Domain.UseCase => {
  const schema = Joi.object({
    body: Joi.allow(),
    query: Joi.allow(),
    params: Joi.object({
      id: Joi.string().uuid().trim().required()
    })
  })
  const validation = new JoiAdapter(schema)

  const findRepository = new BaseRepository(UserEntity)
  return new FindUser({
    findRepository,
    validation,
    logger: new PinoLoggerAdapter('[FIND_USER]')
  })
}
