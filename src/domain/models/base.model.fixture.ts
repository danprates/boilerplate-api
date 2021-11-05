import faker from 'faker'
import { BaseModel } from './base.model'

export const BaseModelFixture = (): BaseModel => ({
  id: faker.datatype.uuid(),
  createdAt: faker.date.recent(10),
  updatedAt: new Date()
})
