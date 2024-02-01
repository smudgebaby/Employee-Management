import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: false, enum: ['Employee', 'HR'], default: 'HR' },
    personalInformation: { type: Schema.Types.ObjectId, ref: 'PersonalInformation' },
    onboardingStatus: {
        status: { type: String, enum: ['Never Submit','Pending', 'Approved', 'Rejected'], default: 'Never Submit' },
        feedback: String,
    },
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    visaStatus: { type: Schema.Types.ObjectId, ref: 'VisaStatus' },
    token: { type: String }
});

const User = mongoose.model('User', userSchema);
export default {User};
