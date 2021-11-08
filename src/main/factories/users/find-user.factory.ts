import { UserEntity } from '@/infra/databases/postgres/entities'
import { BaseRepository } from '@/infra/databases/postgres/repositories'
import { FindBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbFindBase } from '@/services/usecases/base'

export const findUsersFactory = (): Controller => {
  const repository = new BaseRepository(UserEntity)
  const usecase = new DbFindBase(repository)
  return new FindBaseController(usecase)
}
