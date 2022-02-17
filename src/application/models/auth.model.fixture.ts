import faker from '@faker-js/faker'
import { AuthModel } from './auth.model'
import { BaseModelFixture } from './base.model.fixture'

export const AuthModelFixture = (): AuthModel => ({
  ...BaseModelFixture(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordResetToken: faker.datatype.uuid()
})
