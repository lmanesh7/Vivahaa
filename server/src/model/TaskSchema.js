import mongoose from "mongoose";

const { Schema } = mongoose

const TaskSchema = new Schema({
    name: String,
    description: String,
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false,
    },
    category: String, // New field for category
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model("TaskList",TaskSchema);