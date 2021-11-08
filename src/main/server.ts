import { PostgresHelper } from '@/infra/databases/typeorm/postgres-helper'
import app from './config/app'
import { PORT } from './config/env.config'

void PostgresHelper.connect().then(() => {
  console.log('Database is running')
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
})
