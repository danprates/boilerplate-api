import { NODE_ENV, PORT } from '@/infra/config/env.config'
import ExpressAdapter from '@/infra/http/express.adapter'
import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'

const logger = new PinoLoggerAdapter('SERVER')

enum ExitStatus {
  Failure = 1,
  Success = 0
}

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']

process.on('unhandledRejection', (reason, promise) => {
  logger.error('App exiting due to an unhandled promise', { reason, promise })
  // lets throw the error and let the uncaughtException handle below handle it
  throw reason
})

process.on('uncaughtException', (error) => {
  logger.fatal('App exiting due to an uncaught exception', error)
  process.exit(ExitStatus.Failure)
})

const main = async (): Promise<void> => {
  try {
    const http = new ExpressAdapter()

    http.listen(Number(PORT), () =>
      logger.info(
        `Server running in ${NODE_ENV} mode at http://localhost:${PORT}`
      )
    )

    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          http.close()
          logger.info('App exited with success')
          process.exit(ExitStatus.Success)
        } catch (error) {
          logger.error('App exited with error', error)
          process.exit(ExitStatus.Failure)
        }
      })
    }
  } catch (error) {
    logger.fatal('App exited with error', error)
    process.exit(ExitStatus.Failure)
  }
}

main()
