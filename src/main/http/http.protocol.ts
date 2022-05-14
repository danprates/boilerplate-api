import { Controller } from '@/application/protocols'

export interface Http {
  app: any
  addRoute: (method: string, url: string, factory: () => Controller) => void
  listen: (port: number, callback?: any) => void
  close: (callback?: any) => void
  controllerAdapter: (controller: Controller) => any
  cors: (origin: string) => void
  contentType: (type: string) => void
}
