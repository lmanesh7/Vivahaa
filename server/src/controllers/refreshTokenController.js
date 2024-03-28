import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import { generateTokenPayload } from '../utils/index.js'

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies.jwt

  if (!cookie) {
    return res.status(401).json({ message: 'No cookie provided' })
  }
  const refreshToken = cookie

  const foundUser = await User.findOne({ refreshToken }).exec()

  if (!foundUser) {
    return res.sendStatus(403)
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || decoded.UserInfo.email !== foundUser.email) {
        return res.sendStatus(403)
      }

      const accessToken = jwt.sign(
        generateTokenPayload(foundUser),
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60s' }
      )
      res.status(200).json({ accessToken, id: foundUser._id })
    }
  )
}

export { handleRefreshToken }
