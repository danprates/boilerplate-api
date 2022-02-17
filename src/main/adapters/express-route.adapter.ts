import { Controller, HttpRequest } from '@/application/protocols'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    try {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params
      }

      if (req.query) {
        const { take, skip, ...query } = req.query

        httpRequest.query = {
          take: Number(req.query.take) || 10,
          skip: Number(req.query.skip) || 0,
          ...query
        }
      }

      const httpResponse = await controller.handler(httpRequest)

      res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
      res.status(500).json({ message: 'Server erro', code: error.name })
    }
  }
}
