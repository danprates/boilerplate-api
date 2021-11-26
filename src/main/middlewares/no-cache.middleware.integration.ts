import request from 'supertest'
import app from '../config/app'
import { noCache } from './no-cache.middleware'

describe('NoCache middleware', () => {
  it('should disable cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
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
