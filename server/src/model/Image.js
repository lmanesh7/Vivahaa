import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
