import { Connection, createConnection, EntityTarget, getConnectionManager, Repository } from 'typeorm'

export const PostgresHelper = {
  connectionManager: getConnectionManager(),
  client: null as unknown as Connection,

  async connect (): Promise<void> {
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

    this.client = connection
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getRepository<Entity>(entity: EntityTarget<Entity>): Promise<Repository<Entity>> {
    if (!this.client || !this.client.isConnected) {
      await this.connect()
    }
    return this.client.getRepository(entity)
  }
}
