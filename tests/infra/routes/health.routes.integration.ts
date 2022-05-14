import { API_VERSION, NODE_ENV } from '@/infra/config/env.config'
import ExpressAdapter from '@/infra/http/express.adapter'
import request from 'supertest'

describe('/health routes', () => {
  it('Should return health message', async () => {
    const http = new ExpressAdapter()
    await request(http.app)
      .get(`/api/${API_VERSION}/health`)
      .expect(200)
      .expect({ message: `App is running in ${NODE_ENV} mode` })
  })
})
