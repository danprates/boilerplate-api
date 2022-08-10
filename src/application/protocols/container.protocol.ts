export declare namespace Dependencies {
  export interface Logger {
    debug: (message: string, values?: any) => void
    info: (message: string, values?: any) => void
  }

  export interface Container {
    logger: Logger
  }
}
