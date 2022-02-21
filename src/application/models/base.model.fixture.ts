import faker from '@faker-js/faker'
import { BaseModel } from './base.model'

export const BaseModelFixture = (): BaseModel => ({
  id: faker.datatype.uuid(),
  isActive: faker.datatype.boolean(),
  isDeleted: faker.datatype.boolean(),
  createdAt: faker.date.recent(10),
  updatedAt: new Date()
})
