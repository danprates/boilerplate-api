import request from 'supertest'
import app from '../config/app'

describe('/health routes', () => {
  it('Should return health message', async () => {
    await request(app)
      .get('/api/v1/health')
      .expect(200)
      .expect({ message: 'App is running in test mode' })
  })
})
