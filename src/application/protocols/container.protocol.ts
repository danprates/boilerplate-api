import {
  CreateRepository,
  FindRepository,
  HardDeleteRepository,
  ListRepository,
  SoftDeleteRepository,
  UpdateRepository
} from './repository.protocol'
import { Validator } from './validator.protocol'

export declare namespace Dependencies {
  export interface Logger {
    debug: (message: string, values?: any) => void
    info: (message: string, values?: any) => void
    warn: (message: string, object?: any) => void
    error: (message: string, object?: any) => void
    fatal: (message: string, object?: any) => void
  }

  export interface Container {
    logger: Logger
    validation: Validator
    createRepository: CreateRepository
    deleteRepository: HardDeleteRepository | SoftDeleteRepository
    findRepository: FindRepository
    listRepository: ListRepository
    updateRepository: UpdateRepository
  }
}
