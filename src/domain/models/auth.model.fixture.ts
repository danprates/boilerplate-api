import faker from 'faker'
import { BaseModelFixture } from '.'
import { AuthModel } from './auth.model'

export const AuthModelFixture = (): AuthModel => ({
  ...BaseModelFixture(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordResetToken: faker.datatype.uuid()
})
