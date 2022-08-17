import ExpressAdapter from '@/infra/http/express.adapter'
import request from 'supertest'
import { containerFixture } from '../container.fixture'

describe('Default middleware', () => {
  let http: ExpressAdapter

  beforeAll(async () => {
    http = await ExpressAdapter.init(containerFixture)
  })

  describe('Body-parser middleware', () => {
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

  describe('Content Type middleware', () => {
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

  describe('CORS middleware', () => {
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

  describe('express headers middleware', () => {
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
})
