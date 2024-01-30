import EmployeeInfoForm from '../../../Components/EmployeeInfoForm.jsx'
import { useState } from 'react';
import EmployeeInfoForm from '../../Components/EmployeeInfoForm.jsx'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import LoadSpinner from '../../Components/LoadSpinner/LoadSpinner.jsx';
import {saveEmployeeInfo, createEmployeeInfo} from '../../Utils/backendUtil.js';

const OnboardApplication = () => {

  const initialData = {
    firstName: '',
    lastName: '',
    middleName: '',
    preferredName: '',
    profilePicture: '',
    address: {
      building: '', street: '', city: '', state: '', zip: '', },
    cellPhoneNumber: '',
    workPhoneNumber: '',
    email: 'john.doe@example.com',
    ssn: '',
    dateOfBirth: '',
    gender: '',
    citizenship: '',
    workAuthorizationType: '',
    startWorkAuthorizationDate: '',
    endWorkAuthorizationDate: '',
    reference: {
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      relationship: '',
    },
    emergencyContacts: [
      {
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        relationship: '',
      },
    ],
  };

  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);
  // const userId = '65b5a6d8114c6ec9a6044216';
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

        console.log(userInformation);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);



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

  // update to db
  const submitForm = () => {
    saveEmployeeInfo(userId, formData)
    // onboarding.status = 'pending'
  }


  return (
  <>
    {loading? <LoadSpinner /> : (
      <>
        {formData.onboardingStatus.status === 'rejected' &&
          <div>
            <h4>Rejected, please see feedback and resubmit</h4>
            <h4>HR Feedback: {formData.onboardingStatus.feedback}</h4></div>
          }

        {(formData.onboardingStatus.status === 'never submitted' || formData.onboardingStatus.status === 'rejected') &&
        <EmployeeInfoForm
          formData={formData}
          handleChange={handleChange}
          disable={false}
          page='onboarding'
          submitForm={submitForm}
          submitButton={true}
        />}

        {formData.onboardingStatus.status === 'pending' &&
        <EmployeeInfoForm
          formData={formData}
          handleChange={handleChange}
          disable={true}
          page='onboarding'
        />}

        {formData.onboardingStatus.status === 'approved' &&
          <div>
            <p>Congratulation! your application has been approved, please go to </p>
            <Link to='/' >HOME </Link>
          </div>
        }
      </>
    )}
  </>)
}

export default OnboardApplication;
