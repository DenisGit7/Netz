import { User } from '../../models/Users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Both fields are required' })
  }
  try {
    const user = await User.findOne({ username: username }).exec()
    if (!user) return res.status(401).json({ message: 'User not found' })
    const checkPwd = await bcrypt.compare(password, user.password)
    if (checkPwd) {
      console.log(user.role)
      const accessToken = jwt.sign(
        {
          User: {
            username: user.username,
            role: user.role
          }
        },
        'JSDHFJSHJFKHSJKGHSG',
        { expiresIn: '5m' }
      )
      const refreshToken = jwt.sign(
        { username: user.username },
        'SJKDHJKFSHDJKFHJKSDHFJKHSKDJHKJFSD',
        { expiresIn: '1d' }
      )
      user.refreshToken = refreshToken
      const result = await user.save()
      console.log(result)
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ accessToken })
    } else {
      res.status(401).json({ message: 'Wrong password' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
