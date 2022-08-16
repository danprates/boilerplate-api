import { readdirSync } from 'fs'
import { join } from 'path'
import { App, Dependencies, Domain } from './protocols'

export class Application {
  private readonly useCases: Domain.UseCase[] = []
  private constructor(
    private readonly http: App.Http,
    private readonly container: Dependencies.Container
  ) {}

  static async init(
    http: App.Http,
    container: Dependencies.Container
  ): Promise<Application> {
    const app = new Application(http, container)
    await app.initUseCases()
    app.setupRest()
    return app
  }

  setupRest(): void {
    this.container.logger.debug('REST endpoints')
    this.useCases.forEach((useCase) => {
      const { method, route, description } = useCase.getMetaData()

      const url = `/api/v1${route}`

      this.container.logger.debug(`${method} ${url} -> ${description}`)
      this.http.addRoute(method, url, useCase)
    })
  }

  listen(port: number, callback: any): void {
    this.http.listen(port, callback)
  }

  async initUseCases(): Promise<void> {
    const path = join(__dirname, './use-cases')

    readdirSync(path).forEach(async (file) => {
      const validFile = !file.endsWith('.map')

      if (validFile) {
        const UseCase = (await import(`./use-cases/${file}`)).default
        this.useCases.push(new UseCase(this.container))
      }
    })

    return Promise.resolve()
  }
}
