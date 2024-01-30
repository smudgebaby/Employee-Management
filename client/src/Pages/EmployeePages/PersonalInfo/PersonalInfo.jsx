import EmployeeInfoForm from '../../../Components/EmployeeInfoForm.jsx'
import { useState } from 'react';
import DocumentUpload from '../../../Components/DocumentUpload.jsx'
const PersonalInfo = () => {

  const initialFormData = {
    firstName: 'John',
    lastName: 'Doe',
    middleName: '',
    preferredName: 'Johnny',
    profilePicture: '',
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
  };


  const [formData, setFormData] = useState(initialFormData);
  const [tempFormData, setTempFormData] = useState(initialFormData);

  const revertData = () => {
    setTempFormData(initialFormData)
  }

  const saveData = () => {
    setFormData(tempFormData)
  }


  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith('emergencyContacts')) {
      const [fieldName, index, subFieldName] = name.match(/\[(\d+)\]\.(\w+)/);
      const updatedEmergencyContacts = [...tempFormData.emergencyContacts];
      updatedEmergencyContacts[index] = {
        ...updatedEmergencyContacts[index],
        [subFieldName]: value,
      };

      const updatedFormData = {
        ...tempFormData,
        emergencyContacts: updatedEmergencyContacts,
      };

      setTempFormData(updatedFormData);
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
      setTempFormData(updatedFormData);
    }
  };

  const handleAddEmergencyContact = () => {
    const newEmergencyContact = {
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      relationship: '',
    };
  
    const updatedEmergencyContacts = [...tempFormData.emergencyContacts, newEmergencyContact];
    const updatedFormData = {
      ...tempFormData,
      emergencyContacts: updatedEmergencyContacts,
    };

    setTempFormData(updatedFormData);
  };

  return (
  <>

    <EmployeeInfoForm 
      formData={tempFormData} 
      handleChange={handleChange} 
      disable={true} 
      handleAddEmergencyContact={handleAddEmergencyContact} 
      page='personalInfo'
      revertData={revertData}
      saveData={saveData}
    />
    <DocumentUpload
      driverLicenceId = '65b58ff52815f1ebed74a80a'
      workAuthId = '65b5932a2815f1ebed74a830'
    />
      
  </>)
}

export default PersonalInfo;
