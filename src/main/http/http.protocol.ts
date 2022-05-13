import { Controller } from '@/application/protocols'

export interface Http {
  on: (method: string, url: string, factory: () => Controller) => void
  listen: (port: number, callback: any) => void
}
