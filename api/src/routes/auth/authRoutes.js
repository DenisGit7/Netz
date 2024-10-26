import { Router } from 'express'
import passport from 'passport'
import {
  registerUser,
  loginUser,
  authStatus,
  logoutUser
} from '../../controllers/auth/authController.js'

const router = Router()

//Registration Route
router.post('/register', registerUser)

//Login Route
router.post('/login', passport.authenticate('local'), loginUser)

//Auth Status Route
router.get('/status', authStatus)

//Logout Route
router.post('/logout', logoutUser)

export default router
