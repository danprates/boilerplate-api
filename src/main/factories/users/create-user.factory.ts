import { Controller } from '@/application/protocols'
import { DbCreateBase } from '@/application/usecases/base'
import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { JoiAdapter } from '@/infra/validators/joi.adapter'
import { CreateBaseController } from '@/presentation/controllers/base'
import Joi from 'joi'

export const createUserFactory = (): Controller => {
  const schema = Joi.object({
    params: Joi.object().allow(),
    query: Joi.object().allow(),
    body: Joi.object({
      name: Joi.string().required().trim().min(2).max(50),
      email: Joi.string().required().email().lowercase(),
      password: Joi.string().required().trim().min(6)
    })
  })
  const validation = new JoiAdapter(schema)

  const createRepository = new BaseRepository(UserEntity)
  const usecase = new DbCreateBase({ createRepository })

  return new CreateBaseController({ usecase, validation })
}
