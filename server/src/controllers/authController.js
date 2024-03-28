import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import bcrypt from 'bcrypt'
import { generateTokenPayload } from '../utils/index.js'

const handleLogin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const foundUser = await User.findOne({ email }).exec()

  if (!foundUser) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  try {
    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const accessToken = jwt.sign(
      generateTokenPayload(foundUser),
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '300s' }
    )
    const refreshToken = jwt.sign(
      generateTokenPayload(foundUser),
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    foundUser.refreshToken = refreshToken
    await foundUser.save()

    //set refreshToken as a cookie
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })

    res.status(200).json({ accessToken, id: foundUser._id })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}

export { handleLogin }
