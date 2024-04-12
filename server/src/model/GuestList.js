import mongoose from "mongoose";

const {Schema} = mongoose;

const guestSchema = new Schema({
    guests: [{
      name: { type: String, required: true },
      email: { type: String, required: true }
    }],
    eventDate: { type: Date },
    message: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }, { timestamps: true });

  export default mongoose.model('GuestList', guestSchema);