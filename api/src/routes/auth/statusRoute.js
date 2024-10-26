import express from 'express'
import { statusUser } from '../../controllers/auth/statusController.js'

const router = express.Router()

router.get('/', statusUser)

export default router
