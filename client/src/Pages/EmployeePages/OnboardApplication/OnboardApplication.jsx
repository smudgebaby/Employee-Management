import EmployeeInfoForm from '../../../Components/EmployeeInfoForm.jsx'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import LoadSpinner from '../../../Components/LoadSpinner/LoadSpinner.jsx';
import {saveEmployeeInfo, createEmployeeInfo, updateUser} from '../../../Utils/backendUtil.js';
import DocumentUpload from '../../../Components/DocumentUpload.jsx'

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
    email: '',
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
  const [userId, setUserId] = useState()
  const [onboardStatus, setOnboardStatus] = useState()


  useEffect(() => {
    const fetchUserInfo = async () => {
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
        const userResponse = await fetch(`http://localhost:3000/user/getById/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Error fetching employee data');
        }

        const userInformation = await userResponse.json();
        // console.log(userInformation)
        setOnboardStatus(userInformation.onboardingStatus)
        if(!userInformation.personalInformation) {
          setFormData({...initialData, email: userInformation.email})
        }
        else {
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
        }

      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
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
    const updatedUser = updateUser(userId, {onboardingStatus: {'status': 'Pending'}})
      if(updatedUser) {
        alert('Submit information successful');
        window.location.reload();
        setOnboardStatus('Pending');
      } else {
        alert('Error update user');
      }
  }

  const createForm = async () => {
    console.log(formData)
    const infoId = await createEmployeeInfo(userId, formData);
    if(infoId) {
      const updatedUser = updateUser(userId, {personalInformationId: infoId, onboardingStatus: {'status': 'Pending'}})
      if(updatedUser) {
        alert('Submit information successful');
        window.location.reload();
        setOnboardStatus('Pending');
      } else {
        alert('Error update user');
      }
    } else {
      alert('Error submit form');
    }
  }


  return (
    <>
      {loading? <LoadSpinner /> : (
        <>
          {onboardStatus.status === 'Rejected' &&
            <div>
              <h4>Rejected, please see feedback and resubmit</h4>
              {onboardStatus.feedback &&
                <h4>HR Feedback: {onboardStatus.feedback}</h4> 
              }
              <EmployeeInfoForm
                formData={formData}
                handleChange={handleChange}
                disable={false}
                page='onboarding'
                submitForm={submitForm}
                submitButton={true}
              />
            </div>
          }

          {(onboardStatus.status === 'Never Submit') &&
            <EmployeeInfoForm
              formData={formData}
              handleChange={handleChange}
              disable={false}
              page='onboarding'
              submitForm={createForm}
              submitButton={true}
            />}

          {onboardStatus.status === 'Pending' &&
            <>
              <h4>Pending for HR approve...</h4>
              <EmployeeInfoForm
                formData={formData}
                handleChange={handleChange}
                disable={true}
                page='onboarding'
              />
            </>
          }

          {onboardStatus.status === 'Approved' &&
            <div>
              <p>Congratulation! your application has been approved, please go to </p>
              <Link to='/' >HOME </Link>
            </div>
          }

        {onboardStatus.status !== 'Approved' &&
          <DocumentUpload/>
        }
        
        </>
      )}

      
    </>)
}

export default OnboardApplication;