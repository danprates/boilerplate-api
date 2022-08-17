import ExpressAdapter from '@/infra/http/express.adapter'
import request from 'supertest'
import { containerFixture } from '../container.fixture'

describe('CORS middleware', () => {
  let http: ExpressAdapter

  beforeAll(async () => {
    http = await ExpressAdapter.init(containerFixture)
  })

  it('should enable CORS', async () => {
    http.app.get('/test_cors', (req, res) => {
      res.send()
    })

    await request(http.app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
