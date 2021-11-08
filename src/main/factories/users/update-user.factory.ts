import { UserEntity } from '@/infra/databases/postgres/entities'
import { BaseRepository } from '@/infra/databases/postgres/repositories'
import { UpdateBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbUpdateBase } from '@/services/usecases/base'

export const updateUserFactory = (): Controller => {
  const repository = new BaseRepository(UserEntity)
  const usecase = new DbUpdateBase(repository)
  return new UpdateBaseController(usecase)
}
