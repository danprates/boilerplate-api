import { Domain } from '@/application/protocols'
import ListUsers from '@/application/use-cases/list-users'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

export const listUsersFactory = (): Domain.UseCase => {
  const schema = Joi.object({
    params: Joi.allow(),
    body: Joi.allow(),
    query: Joi.object({
      take: Joi.number().optional().default(10).min(1),
      skip: Joi.number().optional().default(0).min(0)
    })
  })
  const validation = new JoiAdapter(schema)

  const listRepository = new BaseRepository(UserEntity)
  return new ListUsers({
    listRepository,
    validation,
    logger: new PinoLoggerAdapter('[LIST_USER]')
  })
}
