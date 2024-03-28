import mongoose from 'mongoose'

const { Schema } = mongoose

const messageSchema = new Schema({
  serviceId: {type: Schema.Types.ObjectId,  required:true},
  serviceType: {type:String, required:true},
  fullName: { type: String, required: true  },
  message: { type: String, required: true },
  vendorReplies:{type:[String]},
  userReplies:{type:[String]},
  phone: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('message', messageSchema)
