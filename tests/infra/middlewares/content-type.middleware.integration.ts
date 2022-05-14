import ExpressAdapter from '@/infra/http/express.adapter'
import request from 'supertest'

describe('Content Type middleware', () => {
  const http = new ExpressAdapter()

  it('should return default content type as json', async () => {
    http.app.get('/test_content_type', (req, res) => {
      res.send()
    })

    await request(http.app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  it('should return xml content type when forced', async () => {
    http.app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    })

    await request(http.app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
