import { ListBaseController } from '@/application/controllers/base'
import { Controller } from '@/application/protocols'
import { DbListBase } from '@/application/usecases/base'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import Joi from 'joi'

export const listUsersFactory = (): Controller => {
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
  const usecase = new DbListBase({ listRepository })
  return new ListBaseController({ usecase, validation })
}
