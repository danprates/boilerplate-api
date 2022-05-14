import { httpFactory } from '@/main/config/http.factory'
import { noCache } from '@/main/middlewares'
import request from 'supertest'

describe('NoCache middleware', () => {
  it('should disable cache', async () => {
    const http = httpFactory()
    http.app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })

    await request(http.app)
      .get('/test_no_cache')
      .expect(
        'cache-control',
        'no-cache, no-store, must-revalidate, proxy-validate'
      )
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
