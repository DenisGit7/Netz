import express from 'express'
import {
  editUser,
  getAllUsers,
  getUser,
  removeUser
} from '../controllers/usersController.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.patch('/:id', editUser)
router.delete('/:id', removeUser)

export default router
