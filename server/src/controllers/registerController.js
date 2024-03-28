import ROLES_LIST from '../config/roles_list.js'
import User from '../model/User.js'
import bcrypt from 'bcrypt'

const handleNewUser = async (req, res) => {
  const { email, password, fullName, mobileNumber, userType } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  if (!ROLES_LIST[userType]) {
    return res.status(400).json({ message: 'Invalid role' })
  }

  const isDuplicate = await User.findOne({ email }).exec()

  if (isDuplicate) {
    return res.status(409).json({ message: 'Email already exists' })
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 10)

    await User.create({
      email,
      password: hashedPwd,
      fullName,
      mobileNumber,
      roles: ROLES_LIST[userType]
    })

    res.status(201).json({ message: `New user created` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export { handleNewUser }
