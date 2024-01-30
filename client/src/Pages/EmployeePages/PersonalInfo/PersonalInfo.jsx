import EmployeeInfoForm from '../../../Components/EmployeeInfoForm.jsx'
import DocumentUpload from '../../../Components/DocumentUpload.jsx'
import { useState, useEffect } from 'react';
import LoadSpinner from '../../../Components/LoadSpinner/LoadSpinner.jsx';
import {saveEmployeeInfo} from '../../../Utils/backendUtil.js';


const PersonalInfo = () => {

  const [formData, setFormData] = useState();
  const [tempFormData, setTempFormData] = useState();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState()


  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userIdResponse = await fetch('http://localhost:3000/user/auth-status', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!userIdResponse.ok) {
          throw new Error('Error fetching userId');
        }

        const userIdData = await userIdResponse.json();
        const userId = userIdData.user.id;
        setUserId(userId)
        console.log(userIdData)

        // fetch user information
        const userInformationResponse = await fetch(`http://localhost:3000/info/get/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!userInformationResponse.ok) {
          throw new Error('Error fetching employee data');
        }

        const userInformation = await userInformationResponse.json();
        setFormData(userInformation)
        setTempFormData(userInformation);

      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
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
