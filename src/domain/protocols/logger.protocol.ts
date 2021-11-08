export interface LogDebug {
  debug: (message: string, object?: any) => void
}

export interface LogInfo {
  info: (message: string, object?: any) => void
}

export interface LogWarn {
  warn: (message: string, object?: any) => void
}

export interface LogError {
  error: (message: string, object?: any) => void
}

export interface LogFatal {
  fatal: (message: string, object?: any) => void
}

export interface Logger extends LogDebug, LogInfo, LogWarn, LogError, LogFatal {}
