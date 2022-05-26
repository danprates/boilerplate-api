import ExpressAdapter from '@/infra/http/express.adapter'
import request from 'supertest'

describe('CORS middleware', () => {
  it('should enable CORS', async () => {
    const http = new ExpressAdapter()
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
