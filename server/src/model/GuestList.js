import mongoose from "mongoose";

const {Schema} = mongoose;

const guestSchema = new Schema({
    guests: [{
      name: { type: String, required: true },
      email: { type: String, required: true }
    }],
    eventDate: { type: Date },
    eventTime: {type: String},
    venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
    meetingLink: { type: String},
    message: { type: String },
    inviterName: {type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attachment: {type: String},
  }, { timestamps: true });

  export default mongoose.model('GuestList', guestSchema);