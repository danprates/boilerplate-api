import { Controller, HttpRequest, HttpResponse } from '../protocols'

export default class HealthController implements Controller {
  constructor(private readonly env: string) {}
  async handler(request: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve({
      statusCode: 200,
      body: { message: `App is running in ${this.env} mode` }
    })
  }
}
