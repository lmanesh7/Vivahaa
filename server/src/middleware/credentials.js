import { allowedOrigins } from "../config/allowedOrigins.js"

const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    console.log('allowedOrigin')
    res.header("Access-Control-Allow-Credentials", true)
  }

  next()
}

export default credentials
