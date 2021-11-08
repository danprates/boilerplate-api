import { UserEntity } from '@/infra/databases/postgres/entities'
import { BaseRepository } from '@/infra/databases/postgres/repositories'
import { CreateBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbCreateBase } from '@/services/usecases/base'

export const createUserFactory = (): Controller => {
  const repository = new BaseRepository(UserEntity)
  const usecase = new DbCreateBase(repository)
  return new CreateBaseController(usecase)
}
