import { Controller } from '@/application/protocols'
import { DbFindBase } from '@/application/usecases/base'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import { FindBaseController } from '@/presentation/controllers/base'
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
  const usecase = new DbFindBase({ findRepository })
  return new FindBaseController({ usecase, validation })
}
