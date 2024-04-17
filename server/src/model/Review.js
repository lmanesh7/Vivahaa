import mongoose from "mongoose";

const { Schema } = mongoose

const ReviewSchema = new Schema({
    author: String,
    rating: Number,
    comment: String,
    serviceId: { type: Schema.Types.ObjectId},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true})

export default mongoose.model('Review', ReviewSchema);