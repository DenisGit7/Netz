import express from 'express'
import { deletePost } from '../../controllers/posts/deletePost.js'
const router = express.Router()

router.delete('/:id', deletePost)

export default router
