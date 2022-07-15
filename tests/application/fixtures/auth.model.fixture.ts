import { AuthModel } from '@/application/models'
import { faker } from '@faker-js/faker'
import { BaseModelFixture } from './base.model.fixture'

export const AuthModelFixture = (): AuthModel => ({
  ...BaseModelFixture(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordResetToken: faker.datatype.uuid()
})
