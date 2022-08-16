import { NODE_ENV, PORT } from '@/infra/config/env.config'
import ExpressAdapter from '@/infra/http/express.adapter'
import { Application } from './application/application'
import { container } from './infra/container'

enum ExitStatus {
  Failure = 1,
  Success = 0
}

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']

process.on('unhandledRejection', (reason, promise) => {
  container.logger.error('App exiting due to an unhandled promise', {
    reason,
    promise
  })
  // lets throw the error and let the uncaughtException handle below handle it
  throw reason
})

process.on('uncaughtException', (error) => {
  container.logger.fatal('App exiting due to an uncaught exception', error)
  process.exit(ExitStatus.Failure)
})

const main = async (): Promise<void> => {
  try {
    const http = new ExpressAdapter()
    const app = await Application.init(http, container)

    app.listen(Number(PORT), () =>
      container.logger.info(
        `Server running in ${NODE_ENV} mode at http://localhost:${PORT}`
      )
    )

    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          http.close()
          container.logger.info('App exited with success')
          process.exit(ExitStatus.Success)
        } catch (error) {
          container.logger.error('App exited with error', error)
          process.exit(ExitStatus.Failure)
        }
      })
    }
  } catch (error) {
    container.logger.fatal('App exited with error', error)
    process.exit(ExitStatus.Failure)
  }
}

main()
