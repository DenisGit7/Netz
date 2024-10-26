import { User } from '../../src/models/Users.js'
import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'

export const refreshTokenController = async (req, res) => {
  const cookies = req.cookies
  //   const cookies = req.headers.cookie;
  console.log(cookies)

  if (!cookies?.jwt) return res.status(204).json({ message: 'No cookies' })
  const refreshToken = cookies.jwt
  console.log('++++++++++++++++++')
  const user = await User.findOne({ refreshToken: refreshToken })

  if (!user) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false })
    return res.status(403).json({ message: 'Forbidden' })
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.username !== decoded.username) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    const role = user.role

    const accessToken = jwt.sign(
      {
        User: {
          username: decoded.username,
          role: role
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '120s' }
    )
    res.json({ role, accessToken })
  })
}
