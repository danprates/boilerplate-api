import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { DeleteBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbSoftDeleteBase } from '@/services/usecases/base'

export const deleteUserFactory = (): Controller => {
  const deleteRepository = new BaseRepository(UserEntity)
  const usecase = new DbSoftDeleteBase({ deleteRepository })
  return new DeleteBaseController(usecase)
}
