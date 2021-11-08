import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { FindBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbFindBase } from '@/services/usecases/base'

export const findUsersFactory = (): Controller => {
  const repository = new BaseRepository(UserEntity)
  const usecase = new DbFindBase(repository)
  return new FindBaseController(usecase)
}
