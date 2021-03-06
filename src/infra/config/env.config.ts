import { config } from 'dotenv'

config({ path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env' })

export const {
  APP_NAME = 'API',
  LOG_LEVEL = 'debug',
  PORT = 3000,
  API_VERSION = 'v1',
  NODE_ENV = 'development',
  JWT_SECRET = 'supersecret'
} = process.env
