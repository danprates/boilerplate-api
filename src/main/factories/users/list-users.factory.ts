import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { ListBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbListBase } from '@/services/usecases/base'

export const listUsersFactory = (): Controller => {
  const repository = new BaseRepository(UserEntity)
  const usecase = new DbListBase(repository)
  return new ListBaseController(usecase)
}
