import express from 'express'
import { editNew } from '../../controllers/news/editNew.js'
const router = express.Router()

router.patch('/:id', editNew)

export default router
