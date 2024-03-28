import User from "../model/User.js"
import multer from 'multer'

export const getAllUsers = async (req, res) => {
  try {
    let users = await User.find()
    if (!users || users.length === 0) {
      return res.status(204).json({ message: 'No users found' })
    }
    users = users.map(user => user.userName)
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const paramUserId = req.params.id
    const _id = req.UserInfo.id

    if (paramUserId !== _id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    let user = await User.findOne({ _id }).exec()

    if (!user) {
      return res.status(204).json({ message: 'No user found' })
    }

    const UserInfo = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      roles: user.roles,
      profilePicture: user.profilePicture
    }
    res.json(UserInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUserById = async (req, res) => {
  const userId = req.params.id
  const userData = req.body

  const _id = req.UserInfo.id

  if (userId !== _id) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
 
  try {
    const { buffer, mimetype, originalname } = req.file
// console.log(req.file)
// res.sendStatus(200)
    const existingUser = await User.findById(userId)
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update user details
    existingUser.fullName = userData.fullName
    existingUser.email = userData.email
    existingUser.mobileNumber = userData.mobileNumber

    // // Handle profile picture
    if (buffer) {
      // Handle profile picture if provided in the request
      existingUser.profilePicture = {
        data: buffer,
        contentType: mimetype,
        name: originalname
      }
    }

    // // Save updated user details
    await existingUser.save()

    const UserInfo = {
      id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      mobileNumber: existingUser.mobileNumber,
      roles: existingUser.roles,
      profilePicture: existingUser.profilePicture
    }

    res.status(200).json(UserInfo)
  } catch (error) {
    console.error('Error updating user details:', error)
    res.status(500).json({ error: 'Failed to update user details' })
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const paramUserId = req.params.id;
    const _id = req.UserInfo.id;

    if (paramUserId !== _id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


