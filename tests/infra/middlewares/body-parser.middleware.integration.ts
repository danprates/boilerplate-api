import ExpressAdapter from '@/infra/http/express.adapter'
import request from 'supertest'
import { containerFixture } from '../container.fixture'

describe('Body-parser middleware', () => {
  let http: ExpressAdapter

  beforeAll(async () => {
    http = await ExpressAdapter.init(containerFixture)
  })

  it('should parse body as json', async () => {
    http.app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(http.app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
