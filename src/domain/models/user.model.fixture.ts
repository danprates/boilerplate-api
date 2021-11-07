import faker from 'faker'
import { AuthModelFixture } from './auth.model.fixture'
import { UserModel } from './user.model'

export const UserModelFixture = (): UserModel => ({
  ...AuthModelFixture(),
  name: faker.name.findName()
})
