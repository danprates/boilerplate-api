import { Controller, HttpRequest, HttpResponse } from '@/application/protocols'
import { NODE_ENV } from '../config/env.config'
import { Http } from '../http/http.protocol'

class HealthController implements Controller {
  async handler(request: HttpRequest<unknown>): Promise<HttpResponse> {
    return Promise.resolve({
      statusCode: 200,
      body: { message: `App is running in ${NODE_ENV} mode` }
    })
  }
}

export default (http: Http): void => {
  http.on('get', '/health', () => new HealthController())
}
