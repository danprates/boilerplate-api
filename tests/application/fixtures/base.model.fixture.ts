import { BaseModel } from '@/application/models'
import { faker } from '@faker-js/faker'

export const BaseModelFixture = (): BaseModel => ({
  id: faker.datatype.uuid(),
  isActive: faker.datatype.boolean(),
  isDeleted: faker.datatype.boolean(),
  createdAt: faker.date.recent(10),
  updatedAt: new Date()
})
