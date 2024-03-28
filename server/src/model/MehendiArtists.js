import mongoose from 'mongoose'

const { Schema } = mongoose

const mehendiArtistSchema = new Schema({
  businessName: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  priceQuote: { type: String, required: true },
  artistDescription: { type: String, required: true },
  workDescription: { type: String, required: true },
  image:{type:String, required: true},
  workImages: [String],
  contactInfo: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default mongoose.model('MehendiArtist', mehendiArtistSchema)
