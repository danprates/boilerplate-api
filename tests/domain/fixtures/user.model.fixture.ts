import { User } from '@/domain/entities/user'
import { faker } from '@faker-js/faker'

export const UserModelFixture = (data?: Partial<User>): User => ({
  id: faker.datatype.uuid(),
  isActive: faker.datatype.boolean(),
  isDeleted: faker.datatype.boolean(),
  createdAt: faker.date.recent(10),
  updatedAt: new Date(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordResetToken: faker.datatype.uuid(),
  ...data
})
