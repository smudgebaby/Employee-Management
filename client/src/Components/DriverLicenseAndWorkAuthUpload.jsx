import React, { useState } from 'react';
import { Container, Button, Card, CardContent, CardActions, Typography, LinearProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function DriverLicenseWorkAuthAndProfilePictureUpload({ 
  onUploadDriverLicense, 
  onUploadWorkAuthorization, 
  onUploadProfilePicture, // Add a prop for uploading the profile picture
  uploadingDriverLicense, 
  uploadingWorkAuthorization, 
  uploadingProfilePicture, // Add state for uploading the profile picture
  driverLicenseStatus, 
  workAuthorizationStatus, 
  profilePictureStatus // Add a state for the profile picture status
}) {
  const [driverLicenseFile, setDriverLicenseFile] = useState(null);
  const [workAuthorizationFile, setWorkAuthorizationFile] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null); // State for profile picture file

  const handleDriverLicenseFileChange = (event) => {
    setDriverLicenseFile(event.target.files[0]);
  };

  const handleWorkAuthorizationFileChange = (event) => {
    setWorkAuthorizationFile(event.target.files[0]);
  };

  const handleProfilePictureFileChange = (event) => {
    setProfilePictureFile(event.target.files[0]); // Handle profile picture file selection
  };

  const uploadDriverLicenseFile = () => {
    if (driverLicenseFile) {
      onUploadDriverLicense(driverLicenseFile);
    }
  };

  const uploadWorkAuthorizationFile = () => {
    if (workAuthorizationFile) {
      onUploadWorkAuthorization(workAuthorizationFile);
    }
  };

  const uploadProfilePictureFile = () => {
    if (profilePictureFile) {
      onUploadProfilePicture(profilePictureFile); // Upload the profile picture file
    }
  };

  return (
    <Container maxWidth="md">
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Driver License</Typography>
          <Typography color="textSecondary" gutterBottom>
            Status: {driverLicenseStatus}
          </Typography>
          <input
            accept="application/pdf,image/*"
            style={{ display: 'none' }}
            id="upload-driver-license"
            type="file"
            onChange={handleDriverLicenseFileChange}
          />
          <label htmlFor="upload-driver-license">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
              disabled={uploadingDriverLicense}
              sx={{ mt: 2 }}
            >
              Choose File
            </Button>
          </label>
          {uploadingDriverLicense && <LinearProgress sx={{ mt: 1 }} />}
        </CardContent>
        <CardActions>
          <Button
            startIcon={<UploadFileIcon />}
            variant="contained"
            color="primary"
            onClick={uploadDriverLicenseFile}
            disabled={!driverLicenseFile || uploadingDriverLicense}
          >
            Upload Driver License
          </Button>
        </CardActions>
      </Card>

      {/* Work Authorization Upload */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Work Authorization</Typography>
          <Typography color="textSecondary" gutterBottom>
            Status: {workAuthorizationStatus}
          </Typography>
          <input
            accept="application/pdf,image/*"
            style={{ display: 'none' }}
            id="upload-work-authorization"
            type="file"
            onChange={handleWorkAuthorizationFileChange}
          />
          <label htmlFor="upload-work-authorization">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
              disabled={uploadingWorkAuthorization}
              sx={{ mt: 2 }}
            >
              Choose File
            </Button>
          </label>
          {uploadingWorkAuthorization && <LinearProgress sx={{ mt: 1 }} />}
        </CardContent>
        <CardActions>
          <Button
            startIcon={<UploadFileIcon />}
            variant="contained"
            color="primary"
            onClick={uploadWorkAuthorizationFile}
            disabled={!workAuthorizationFile || uploadingWorkAuthorization}
          >
            Upload Work Authorization
          </Button>
        </CardActions>
      </Card>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Profile Picture</Typography>
          <Typography color="textSecondary" gutterBottom>
            Status: {profilePictureStatus}
          </Typography>
          <input
            accept="image/*" // Accept only images
            style={{ display: 'none' }}
            id="upload-profile-picture"
            type="file"
            onChange={handleProfilePictureFileChange}
          />
          <label htmlFor="upload-profile-picture">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
              disabled={uploadingProfilePicture}
              sx={{ mt: 2 }}
            >
              Choose File
            </Button>
          </label>
          {uploadingProfilePicture && <LinearProgress sx={{ mt: 1 }} />}
        </CardContent>
        <CardActions>
          <Button
            startIcon={<UploadFileIcon />}
            variant="contained"
            color="primary"
            onClick={uploadProfilePictureFile}
            disabled={!profilePictureFile || uploadingProfilePicture}
          >
            Upload Profile Picture
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
  

export default DriverLicenseWorkAuthAndProfilePictureUpload;
