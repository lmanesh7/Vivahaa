import mongoose from 'mongoose';

const { Schema } = mongoose;

const decoratorSchema = new Schema({
  businessName: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  serviceDescription: { type: String, required: true },
  image: { type: String, required: true },
  workImages: [String],
  email: { type: String, required: true },
  phone: { type: String, required: true },
  // services: [
  //   {
  //     name: { type: String, required: true },
  //     price: { type: Number, required: true }
  //   }
 // ],
 services: {type:String, required: true},
 price: {type:Number, required:true},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Decorator', decoratorSchema);
