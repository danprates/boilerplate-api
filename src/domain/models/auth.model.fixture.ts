import faker from 'faker'
import { BaseModelFixture } from '.'
import { AuthModel } from './auth.model'

export const AuthModelFixture = (): AuthModel => ({
  ...BaseModelFixture(),
  email: faker.internet.email(),
  password: 'any_password',
  passwordResetToken: faker.datatype.uuid()
})
