import { UserModel } from '@/domain/models/user.model'
import { faker } from '@faker-js/faker'
import { AuthModelFixture } from './auth.model.fixture'

export const UserModelFixture = (): UserModel => ({
  ...AuthModelFixture(),
  name: faker.name.findName()
})
