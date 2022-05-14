import ExpressAdapter from '../http/express.adapter'
import { Http } from '../http/http.protocol'
import { routesConfig } from './routes.config'

export const httpFactory = (httpAdapter = new ExpressAdapter()): Http => {
  routesConfig(httpAdapter)

  return httpAdapter
}
