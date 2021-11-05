import request from 'supertest'
import app from '../config/app'
import { API_VERSION, NODE_ENV } from '../config/env.config'

describe('/health routes', () => {
  it('Should return health message', async () => {
    await request(app)
      .get(`/api/${API_VERSION}/health`)
      .expect(200)
      .expect({ message: `App is running in ${NODE_ENV} mode` })
  })
})
