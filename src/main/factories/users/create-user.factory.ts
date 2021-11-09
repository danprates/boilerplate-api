import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { CreateBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbCreateBase } from '@/services/usecases/base'

export const createUserFactory = (): Controller => {
  const createRepository = new BaseRepository(UserEntity)
  const usecase = new DbCreateBase({ createRepository })
  return new CreateBaseController(usecase)
}
