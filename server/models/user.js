import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: false, enum: ['employee', 'HR'], default: 'HR' },
    personalInformation: { type: Schema.Types.ObjectId, ref: 'PersonalInformation' },
    onboardingStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    // documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    visaStatus: { type: Schema.Types.ObjectId, ref: 'VisaStatus' }
});

const User = mongoose.model('User', userSchema);
export default {User};
