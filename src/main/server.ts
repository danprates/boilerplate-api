import { TypeormHelper } from '@/infra/databases/typeorm/typeorm-helper'
import app from './config/app'
import { PORT } from './config/env.config'

void TypeormHelper.connect().then(() => {
  console.log('Database is running')
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
})
