import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookingSchema = new Schema({
    fname: {type:String, required: true},
    lname: {type:String, required: true},
    phone: {type:String, required: true},
    email: {type:String, required: true},
    address: {type:String, required: true},
    eventDate: {type:Date, required: true},
    numberOfDates: {type:Number, required: true},
    bookingId: {type:Number},
    notes:{type:String},
    vendorReplies:{type:[String]},
    userReplies:{type:[String]},
    vendor: {type:Schema.Types.ObjectId, required:true},
    user: {type:Schema.Types.ObjectId, required:true},
    vendorType: {type:String, required: true}

}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);

