import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid } from '@mui/material';
import DriverLicenseAndWorkAuthUpload from '../Components/DriverLicenseAndWorkAuthUpload'; // Make sure this is correctly imported
import fetchDocumentData from '../Api/FetchDocumentData';
function DocumentUpload({driverLicenseId, workAuthId}) {
  // console.log(driverLicenseId, workAuthId)
  const [driverLicenseStatus, setDriverLicenseStatus] = useState({
    status: 'Never Submit',
    uploading: false,
  });

  const [workAuthorizationStatus, setWorkAuthorizationStatus] = useState({
    status: 'Never Submit',
    uploading: false,
  });

  // Your existing code for fetching and managing document sections
  useEffect(() => {
    const fetchData = async () => {
      try {
        const DL = await fetchDocumentData(driverLicenseId);
        const WA = await fetchDocumentData(workAuthId);
  
        if (DL) {
          setDriverLicenseStatus({
            status: DL.status || 'Never Submit', // Fallback to 'Never Submit' if DL.status is undefined
            uploading: false,
          });
        }
        if (WA) {
          setWorkAuthorizationStatus({
            status: WA.status || 'Never Submit', // Fallback to 'Never Submit' if WA.status is undefined
            uploading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching document data:', error);
        // Optionally set state to reflect the error condition
      }
    };
  
    // Call the async fetchData function
    fetchData();
  }, [driverLicenseId, workAuthId]);
  const handleUploadDriverLicense = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setDriverLicenseStatus({ ...driverLicenseStatus, uploading: true });

    axios.post(`http://localhost:3000/documents/${workAuthId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      // Assuming the response includes the document data with a status
      setDriverLicenseStatus({
        status: response.data.status,
        uploading: false,
      });
    })
    .catch((error) => {
      console.error('Error uploading driver license:', error);
      setDriverLicenseStatus({ ...driverLicenseStatus, uploading: false });
      // Handle error appropriately
    });
  };

  const handleUploadWorkAuthorization = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setWorkAuthorizationStatus({ ...workAuthorizationStatus, uploading: true });

    axios.post(`/documents/${workAuthId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      // Assuming the response includes the document data with a status
      setWorkAuthorizationStatus({
        status: response.data.status,
        uploading: false,
      });
    })
    .catch((error) => {
      console.error('Error uploading work authorization:', error);
      setWorkAuthorizationStatus({ ...workAuthorizationStatus, uploading: false });
      // Handle error appropriately
    });
  };

  return(
    <DriverLicenseAndWorkAuthUpload
      onUploadDriverLicense={handleUploadDriverLicense}
      onUploadWorkAuthorization={handleUploadWorkAuthorization}
      uploadingDriverLicense={driverLicenseStatus.uploading}
      uploadingWorkAuthorization={workAuthorizationStatus.uploading}
      driverLicenseStatus={driverLicenseStatus.status}
      workAuthorizationStatus={workAuthorizationStatus.status}
    />);
  }
  export default DocumentUpload;