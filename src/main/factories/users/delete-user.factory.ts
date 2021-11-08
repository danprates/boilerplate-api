import { UserEntity } from '@/infra/databases/postgres/entities'
import { BaseRepository } from '@/infra/databases/postgres/repositories'
import { DeleteBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbSoftDeleteBase } from '@/services/usecases/base'

export const deleteUserFactory = (): Controller => {
  const repository = new BaseRepository(UserEntity)
  const usecase = new DbSoftDeleteBase(repository)
  return new DeleteBaseController(usecase)
}
