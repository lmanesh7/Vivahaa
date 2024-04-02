import mongoose from "mongoose";

const {Schema} = mongoose;

const budgetSchema = new Schema({
  budget: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  totalPaid: {
    type: Number,
    required: true
  },
  items: [
    {
      name: String,
      cost: Number,
      paid: Number
    }
  ],
  user: {type:Schema.Types.ObjectId, required:true},
  eventDate: {type:Date}
});

export default mongoose.model('Budget', budgetSchema);
