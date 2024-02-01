import React, { useState } from 'react';
import { Container, Button, Card, CardContent, CardActions, Typography, LinearProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function DriverLicenseAndWorkAuthUpload({ onUploadDriverLicense, onUploadWorkAuthorization, uploadingDriverLicense, uploadingWorkAuthorization, driverLicenseStatus, workAuthorizationStatus }) {
  const [driverLicenseFile, setDriverLicenseFile] = useState(null);
  const [workAuthorizationFile, setWorkAuthorizationFile] = useState(null);
  console.log('**', driverLicenseStatus);
  const handleDriverLicenseFileChange = (event) => {
    setDriverLicenseFile(event.target.files[0]);
  };

  const handleWorkAuthorizationFileChange = (event) => {
    setWorkAuthorizationFile(event.target.files[0]);
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
    </Container>
  );
}

export default DriverLicenseAndWorkAuthUpload;
