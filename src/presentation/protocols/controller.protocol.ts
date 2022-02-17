import { HttpRequest, HttpResponse } from '@/application/protocols'

export interface Controller {
  handler: (request: HttpRequest) => Promise<HttpResponse>
}
