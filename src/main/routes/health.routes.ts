import { Router } from 'express'
import { NODE_ENV } from '../config/env.config'

export default (router: Router): void => {
  router.get('/health', (req, res) => {
    res.status(200).json({ message: `App is running in ${NODE_ENV} mode` })
  })
}
