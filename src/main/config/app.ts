import express from 'express'
import { middlewaresConfig } from './middlewares.config'

const app = express()
middlewaresConfig(app)

export default app
