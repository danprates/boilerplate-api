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
  }
}
