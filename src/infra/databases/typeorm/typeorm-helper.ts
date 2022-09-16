import { PinoLoggerAdapter } from '@/infra/monitoration/pino-logger.adapter'
import {
  Connection,
  createConnection,
  EntityTarget,
  getConnectionManager,
  Repository
} from 'typeorm'

const logger = new PinoLoggerAdapter('DATABASE')

export const TypeOrmHelper = {
  connectionManager: getConnectionManager(),
  client: null as unknown as Connection,

  async connect(): Promise<void> {
    const CONNECTION_NAME = 'default'

    let connection: Connection

    if (this.connectionManager.has(CONNECTION_NAME)) {
      connection = await this.connectionManager.get(CONNECTION_NAME)

      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    } else {
      connection = await createConnection()
    }

    logger.info('Connection opened', {
      connections: this.connectionManager.connections.map((conn) => conn.name)
    })
    this.client = connection
  },

  async disconnect(): Promise<void> {
    if (this.client?.isConnected) {
      await this.client.close()
    }
    logger.info('Connection closed', { isConnected: this.client?.isConnected })
    this.client = null
  },

  async getRepository<Entity>(
    entity: EntityTarget<Entity>
  ): Promise<Repository<Entity>> {
    if (!this.client || !this.client.isConnected) {
      await this.connect()
    }
    return this.client.getRepository(entity)
  }
}
