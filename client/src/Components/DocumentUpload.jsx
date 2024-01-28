import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid } from '@mui/material';
import DriverLicenseAndWorkAuthUpload from '../Components/DriverLicenseAndWorkAuthUpload'; // Make sure this is correctly imported
import fetchDocumentData from '../Api/FetchDocumentData';
function DocumentUpload({driverLicenceId, workAuthId}) {
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
    const DL = fetchDocumentData(driverLicenceId);
    const WA = fetchDocumentData(workAuthId);
    if (DL){
        setDriverLicenseStatus({
            status: DL.status,
            uploading: false,
        })
    if (WA){
        setWorkAuthorizationStatus({
            status: WA.status,
            uploading: false,
        })
    }
    }
  }, [driverLicenceId, workAuthId]);
  const handleUploadDriverLicense = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setDriverLicenseStatus({ ...driverLicenseStatus, uploading: true });

    axios.post(`/documents/${workAuthId}`, formData, {
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