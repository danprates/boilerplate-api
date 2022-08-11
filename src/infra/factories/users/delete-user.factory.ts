import { Domain } from '@/application/protocols'
import DeleteUser from '@/application/use-cases/delete-user'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

export const deleteUserFactory = (): Domain.UseCase => {
  const schema = Joi.object({
    body: Joi.allow(),
    query: Joi.allow(),
    params: Joi.object({
      id: Joi.string().uuid().trim().required()
    })
  })
  const validation = new JoiAdapter(schema)

  const deleteRepository = new BaseRepository(UserEntity)
  return new DeleteUser({
    deleteRepository,
    validation,
    logger: new PinoLoggerAdapter('[DELETE_USER]')
  })
}
