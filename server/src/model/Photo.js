import mongoose from 'mongoose'

const { Schema } = mongoose

const photoSchema = new Schema({
  businessName: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  albumPrice: { type: String, required: true },
  image:{type:String, required: true},
  workImages: [String],
  PerDay: { type: String, required: true },
  contact: { type: String, required: true },
  About: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default mongoose.model('Photo', photoSchema)
