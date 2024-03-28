import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  roles: {
    type: [Number],
    default: [5152]
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String,
  profilePicture: {
    data: Buffer,
    contentType: String,
    name: String
  },
}, {
  timestamps: true // Add timestamps for createdAt and updatedAt
})

export default mongoose.model('User', userSchema)
