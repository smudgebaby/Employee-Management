import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const visaStatusSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  optReceipt: {
    status: String,
    feedback: String,
    fileUrl: String,
  },
  optEad: {
    status: String,
    feedback: String,
    fileUrl: String,
  },
  i983: {
    status: String,
    feedback: String,
    fileUrl: String,
  },
  i20: {
    status: String,
    feedback: String,
    fileUrl: String,
  }
});

const VisaStatus = mongoose.model('VisaStatus', visaStatusSchema);
export default {VisaStatus}