import mongoose from 'mongoose';

const personalInformationSchema = new mongoose.Schema({
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
    required: true
  },
  address: {
    building: { 
      type: String, 
      required: true 
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
    workAuthorizationType: String
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

})

const personalInformation = mongoose.model('PersonalInformation', personalInformationSchema)
export default {personalInformation}