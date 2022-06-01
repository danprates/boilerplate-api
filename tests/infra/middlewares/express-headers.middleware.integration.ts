import ExpressAdapter from '@/infra/http/express.adapter'
import request from 'supertest'

describe('express headers middleware', () => {
  const http = new ExpressAdapter()

  it('should no allow x-powered-by express in headers', async () => {
    http.app.post('/x-powered-by', (req, res) => {
      res.send(req.body)
    })

    const response = await request(http.app)
      .post('/x-powered-by')
      .send({ name: 'any_name' })

    const hasHeader = Object.keys(response.header).includes('x-powered-by')

    expect(hasHeader).toBeFalsy()
  })
})
