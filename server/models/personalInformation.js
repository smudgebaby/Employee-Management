import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const personalInformationSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  middleName: String,
  preferredName: String,
  profilePicture: String,
  ssn: { 
    type: String, 
    required: true 
  },
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'],
    required: false
  },
  address: {
    building: { 
      type: String, 
      required: false 
    },
    street: { 
      type: String, 
      required: true 
    },
    city: { 
      type: String, 
      required: true 
    },
    state: { 
      type: String, 
      required: true 
    },
    zip: { 
      type: String, 
      required: true 
    },
  },
  cellPhoneNumber: {
    type: String, 
    required: true 
  },
  workPhoneNumber: String,
  employment: {
    visaTitle: String,
    startDate: Date,
    endDate: Date
  },
  workAuthorization: {
    citizenship: { 
      type: String, 
      enum: ['Citizen', 'Green Card', 'Other'] 
    },
    workAuthorizationType: {
      type: String,
      enum: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'],
    },
  },
  emergencyContacts: [{
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    email: String,
    relationship: String
  }],
  reference: {
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    email: String,
    relationship: String
  },
  onboardingStatus: {
    status: {type: String, default: 'not submitted'},
    feedback: String
  }

})

const PersonalInformation = mongoose.model('PersonalInformation', personalInformationSchema)
export default {PersonalInformation}