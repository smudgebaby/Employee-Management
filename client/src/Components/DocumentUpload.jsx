import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid } from '@mui/material';
import DriverLicenseAndWorkAuthUpload from '../Components/DriverLicenseAndWorkAuthUpload'; // Make sure this is correctly imported
import fetchDocumentData from '../Api/FetchDocumentData';
function DocumentUpload() {
  // console.log(driverLicenseId, workAuthId)
  const [driverLicenseId, setDriverLicenseId] = useState('');
  const [workAuthId, setWorkAuthId] = useState('');
  const [profilePictureId, setProfilePictureId] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:3000/documents/getByUserId', {
        withCredentials: true
    })
    .then(response => {
        setDriverLicenseId(response.data['Driver License']?._id);
        setWorkAuthId(response.data['Work Authorization']?._id);
        setProfilePictureId(response.data['Profile Picture']?._id);
        // console.log('response:', response.data['Driver License']._id);
    })
    .catch(error => {
        console.error("Error fetching documents:", error);
    });
  },[]);

  const [driverLicenseStatus, setDriverLicenseStatus] = useState({
    status: 'Never Submit',
    uploading: false,
  });

  const [workAuthorizationStatus, setWorkAuthorizationStatus] = useState({
    status: 'Never Submit',
    uploading: false,
  });

  const [profilePictureStatus, setProfilePictureStatus] = useState({
    status: 'Never Submit',
    uploading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DL = await fetchDocumentData(driverLicenseId);
        const WA = await fetchDocumentData(workAuthId);
        const PP = await fetchDocumentData(profilePictureId);
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
        if (PP) {
          setProfilePictureStatus({
            status: PP.status || 'Never Submit',
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
  }, [driverLicenseId, workAuthId, profilePictureId]);
  
  const updateDocumentWithFileUrl = async (documentId, fileUrl) => {
    try {
      const updateData = {
        fileURL: fileUrl,
        status: 'Uploaded', 
      };
  
      const response = await axios.put(`http://localhost:3000/documents/${documentId}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Document updated successfully', response.data);
  
     
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const uploadDocument = async (documentId, file, setStatus) => {
    const formData = new FormData();
    formData.append('file', file);
  
    setStatus(prevState => ({ ...prevState, uploading: true }));
  
    try {
      const uploadResponse = await axios.post(`http://localhost:3000/file/upload`, formData);
  
      const fileUrl = uploadResponse.data.documentName; // Get the file URL from the response
      
      // Now update the document with the new file URL
      await updateDocumentWithFileUrl(documentId, `/${fileUrl}`);
  
      setStatus({
        status: 'Uploaded',
        uploading: false,
      });
  
    } catch (error) {
      console.error(`Error uploading document: ${documentId}`, error);
      setStatus(prevState => ({ ...prevState, uploading: false }));
    }
  };

  // Handlers for each document type
  const handleUploadDriverLicense = (file) => uploadDocument(driverLicenseId, file, setDriverLicenseStatus);
  const handleUploadWorkAuthorization = (file) => uploadDocument(workAuthId, file, setWorkAuthorizationStatus);
  const handleUploadProfilePicture = (file) => uploadDocument(profilePictureId, file, setProfilePictureStatus);


  return(
      <DriverLicenseAndWorkAuthUpload
      onUploadDriverLicense={handleUploadDriverLicense}
      onUploadWorkAuthorization={handleUploadWorkAuthorization}
      onUploadProfilePicture={handleUploadProfilePicture}
      uploadingDriverLicense={driverLicenseStatus.uploading}
      uploadingWorkAuthorization={workAuthorizationStatus.uploading}
      uploadingProfilePicture={profilePictureStatus.uploading}
      driverLicenseStatus={driverLicenseStatus.status}
      workAuthorizationStatus={workAuthorizationStatus.status}
      profilePictureStatus={profilePictureStatus.status}
    />
  );
}
  export default DocumentUpload;