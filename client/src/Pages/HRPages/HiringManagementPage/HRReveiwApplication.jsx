import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams if using React Router v5+
import LoadSpinner from '../../../Components/LoadSpinner/LoadSpinner.jsx';
import EmployeeInfoForm from '../../../Components/EmployeeInfoForm.jsx';

const HRReviewApplication = () => {
  const initialData = {
    // Initial data structure remains the same
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [onboardStatus, setOnboardStatus] = useState();

  // Use useParams to get userId from URL if you're using React Router
  const { userId } = useParams(); // Make sure your route parameter name matches

  useEffect(() => {
    const fetchApplicationData = async () => {
      setLoading(true);
      try {
        
        const response = await fetch(`http://localhost:3000/info/get/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching application data');
        }

        const applicationData = await response.json();
        setFormData(applicationData);
        setOnboardStatus(applicationData.onboardingStatus); // Adjust based on your actual data structure
      } catch (error) {
        console.error('Error fetching application data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [userId]); // Re-fetch if userId changes

  return (
    <>
      {loading ? <LoadSpinner /> : (
        <>
          <div>
            <h2>Application Review</h2>
            {onboardStatus && onboardStatus.status === 'Rejected' && (
              <div>
                <h4>Rejected, please see feedback</h4>
                <h4>HR Feedback: {onboardStatus.feedback}</h4>
              </div>
            )}
            <EmployeeInfoForm
              formData={formData}
              handleChange={() => {}} // Make form read-only by providing no-op handleChange
              disable={true} // Disable form fields
              page='review' // Optionally, use a prop to customize the form for review mode
            />
          </div>
        </>
      )}
    </>
  );
};

export default HRReviewApplication;
