import EmployeeInfoForm from '../../components/EmployeeInfoForm.jsx'
import { useState } from 'react';

const OnboardApplication = () => {

  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    middleName: '',
    preferredName: 'Johnny',
    profilePicture: '', // You can set a default placeholder image URL
    address: {
      building: '',
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zip: '02134',
    },
    cellPhoneNumber: '555-555-5555',
    workPhoneNumber: '555-555-5556',
    email: 'john.doe@example.com',
    ssn: '123-45-6789',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    citizenship: 'Other',
    workAuthorizationType: 'H1-B',
    startWorkAuthorizationDate: '2023-01-01',
    endWorkAuthorizationDate: '2025-01-01',
    reference: {
      firstName: 'Referrer',
      lastName: 'Reference',
      middleName: '',
      phone: '555-555-5557',
      email: 'referrer@example.com',
      relationship: 'Friend',
    },
    emergencyContacts: [
      {
        firstName: 'Emergency',
        lastName: 'Contact',
        middleName: '',
        phone: '555-555-5558',
        email: 'emergency.contact@example.com',
        relationship: 'Family',
      },
      {
        firstName: 'Emergency',
        lastName: 'Contact',
        middleName: '',
        phone: '555-555-5558',
        email: 'emergency.contact@example.com',
        relationship: 'Family',
      },
    ],
    onboardingStatus: {status: 'rejected', feedback: 'Wrong zip code'},
  });


  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith('emergencyContacts')) {
      const [fieldName, index, subFieldName] = name.match(/\[(\d+)\]\.(\w+)/);
      const updatedEmergencyContacts = [...formData.emergencyContacts];
      updatedEmergencyContacts[index] = {
        ...updatedEmergencyContacts[index],
        [subFieldName]: value,
      };

      const updatedFormData = {
        ...formData,
        emergencyContacts: updatedEmergencyContacts,
      };

      setFormData(updatedFormData);
    } else {
      const updatedFormData = name.includes('.')
      ? {
          ...formData,
          [name.split('.')[0]]: {
            ...formData[name.split('.')[0]],
            [name.split('.')[1]]: value,
          },
        }
      : { ...formData, [name]: value };
      setFormData(updatedFormData);
    }
  };


  return (
  <>
    {formData.onboardingStatus.status === 'rejected' && 
      <div>
        <h4>Rejected, please see feedback and resubmit</h4>
        <h4>HR Feedback: {formData.onboardingStatus.feedback}</h4></div>
      }

    {formData.onboardingStatus.status !== 'pending' 
      && <EmployeeInfoForm formData={formData} handleChange={handleChange} disable={false} />}

    {formData.onboardingStatus.status === 'pending' 
      && <EmployeeInfoForm formData={formData} handleChange={handleChange} disable={true} />}
  </>)
}

export default OnboardApplication;