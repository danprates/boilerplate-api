import { Domain } from '@/application/protocols'
import UpdateUser from '@/application/use-cases/update-user'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

export const updateUserFactory = (): Domain.UseCase => {
  const schema = Joi.object({
    query: Joi.allow(),
    params: Joi.object({
      id: Joi.string().uuid().trim().required()
    }),
    body: Joi.object({
      name: Joi.string().optional().trim().min(2).max(50),
      email: Joi.string().optional().email().lowercase(),
      password: Joi.string().optional().trim().min(6)
    })
  })
  const validation = new JoiAdapter(schema)

  const updateRepository = new BaseRepository(UserEntity)
  return new UpdateUser({
    updateRepository,
    validation,
    logger: new PinoLoggerAdapter('[UPDATE_USER]')
  })
}
