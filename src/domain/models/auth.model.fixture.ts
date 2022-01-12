import faker from 'faker'
import { BaseModelFixture } from '.'
import { AuthModel } from './auth.model'

export const AuthModelFixture = (): AuthModel => ({
  ...BaseModelFixture(),
  email: faker.internet.email(),
  password: 'secret',
  passwordResetToken: faker.datatype.uuid()
})
