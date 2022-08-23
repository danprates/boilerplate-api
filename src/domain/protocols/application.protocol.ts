import { Domain } from './domain.protocol'

export declare namespace App {
  export interface Http {
    addResolver: (useCase: Domain.UseCase) => void
    listen: (port: number, callback: any) => void
  }
}
