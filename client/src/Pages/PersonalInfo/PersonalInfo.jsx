import EmployeeInfoForm from '../../Components/EmployeeInfoForm.jsx'
import { useState, useEffect } from 'react';
import DocumentUpload from '../../Components/DocumentUpload.jsx'
import LoadSpinner from '../../Components/LoadSpinner/LoadSpinner.jsx';
import {saveEmployeeInfo} from '../../Utils/backendUtil.js';


const PersonalInfo = () => {

  const [formData, setFormData] = useState();
  const [tempFormData, setTempFormData] = useState();
  const [loading, setLoading] = useState(true);
  const userId = '65b5a6d8114c6ec9a6044216';

  useEffect(() => {

    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/info/get/${userId}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const data = await response.json();
        setFormData(data);
        setTempFormData(data);
        
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      } finally {
        setLoading(false);
      }

    };

    fetchEmployeeData();
  }, []); 


  const revertData = () => {
    setTempFormData(formData)
  }

  // update to db
  const saveData = () => {
    setFormData(tempFormData)
    saveEmployeeInfo(userId, tempFormData)
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

    {loading? <LoadSpinner /> : (
      <EmployeeInfoForm 
        formData={tempFormData} 
        handleChange={handleChange} 
        disable={true} 
        handleAddEmergencyContact={handleAddEmergencyContact} 
        page='personalInfo'
        revertData={revertData}
        saveData={saveData}
      /> 
    )}

    
    <DocumentUpload
      driverLicenceId = '65b58ff52815f1ebed74a80a'
      workAuthId = '65b5932a2815f1ebed74a830'
    />
      
  </>)
}

export default PersonalInfo;
