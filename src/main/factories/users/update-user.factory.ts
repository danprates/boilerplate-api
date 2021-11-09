import { UserEntity } from '@/infra/databases/typeorm/entities'
import { BaseRepository } from '@/infra/databases/typeorm/repositories'
import { UpdateBaseController } from '@/presentation/controllers/base'
import { Controller } from '@/presentation/protocols'
import { DbUpdateBase } from '@/services/usecases/base'

export const updateUserFactory = (): Controller => {
  const updateRepository = new BaseRepository(UserEntity)
  const usecase = new DbUpdateBase({ updateRepository })
  return new UpdateBaseController(usecase)
}
