import { httpFactory } from '@/main/config/http.factory'
import request from 'supertest'

describe('Body-parser middleware', () => {
  const http = httpFactory()

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
