import jwt from 'jsonwebtoken'
import { promises as fsPromises } from 'fs'
import path from 'path'

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No authorization header' })
  }

  const token = authHeader?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.UserInfo = decoded.UserInfo
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

export default verifyJWT
