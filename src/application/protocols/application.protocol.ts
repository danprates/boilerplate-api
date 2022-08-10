import { Domain } from './domain.protocol'

export declare namespace App {
  export interface Http {
    addRoute: (method: string, url: string, useCase: Domain.UseCase) => void
    listen: (port: number, callback: any) => void
  }
}
