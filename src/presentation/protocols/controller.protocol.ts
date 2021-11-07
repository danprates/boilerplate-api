import { HttpRequest, HttpResponse } from './http.protocol'

export interface Controller {
  handler: (request: HttpRequest) => Promise<HttpResponse>
}
