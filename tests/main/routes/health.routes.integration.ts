import { API_VERSION, NODE_ENV } from '@/main/config/env.config'
import { httpFactory } from '@/main/config/http.factory'
import request from 'supertest'

describe('/health routes', () => {
  it('Should return health message', async () => {
    const http = httpFactory()
    await request(http.app)
      .get(`/api/${API_VERSION}/health`)
      .expect(200)
      .expect({ message: `App is running in ${NODE_ENV} mode` })
  })
})
