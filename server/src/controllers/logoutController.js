import User from '../model/User.js'

const handleLogout = async (req, res) => {
  const cookie = req.cookies.jwt

  if (!cookie) {
    return res.sendStatus(204)
  }

  const refreshToken = cookie
  const foundUser = await User.findOne({ refreshToken }).exec()
  console.log('foundUser:', foundUser)
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    return res.sendStatus(204)
  }

  foundUser.refreshToken = ''
  await foundUser.save()

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.sendStatus(204)
}

export { handleLogout }
