import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    type: { type: String, enum: ['Profile Picture', 'Driver License', 'Work Authorization'], required: true },
    fileURL: { type: String },
    status: { type: String, enum: ['Uploaded', 'Not Submit'] }
});
const Document = mongoose.model('Document', documentSchema)
export default {Document}
