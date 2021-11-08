import { config } from 'dotenv'
import { UserEntity } from './entities'
import { TypeormHelper } from './typeorm-helper'

config({ path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env' })

describe('TypeormHelper', () => {
  describe('connect', () => {
    it('should open a new connection with default name', async () => {
      await TypeormHelper.connect()
      expect(TypeormHelper.client).toBeTruthy()
    })

    it('should reconnect when isConnected is false', async () => {
      await TypeormHelper.disconnect()
      expect(TypeormHelper.client).toBeNull()

      await TypeormHelper.connect()
      expect(TypeormHelper.client.isConnected).toBeTruthy()
    })
  })

  describe('close', () => {
    it('should close a connection when the connection is open', async () => {
      await TypeormHelper.connect()
      await TypeormHelper.disconnect()
      expect(TypeormHelper.client).toBeNull()
    })

    it('should do nothing when the connection is already closed', async () => {
      await TypeormHelper.disconnect()
      expect(TypeormHelper.client).toBeNull()
    })
  })

  describe('getRepository', () => {
    it('should return a repository when connection is open', async () => {
      await TypeormHelper.connect()
      const userRepository = TypeormHelper.getRepository(UserEntity)
      expect(userRepository).toBeTruthy()
      expect(TypeormHelper.client).toBeTruthy()
    })

    it('should return a repository when connection is closed', async () => {
      await TypeormHelper.disconnect()
      const userRepository = await TypeormHelper.getRepository(UserEntity)
      expect(userRepository).toBeTruthy()
      expect(TypeormHelper.client).toBeTruthy()
    })
  })
})
