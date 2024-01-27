import { useState } from 'react';
import { Button, Card, CardContent, CardActions, Typography, LinearProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// eslint-disable-next-line react/prop-types
function DocumentSection({ title, onUpload, status, feedback, uploading, isI983, downloadEmptyTemplateUrl, downloadSampleTemplateUrl }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography color="textSecondary" gutterBottom>
          Status: {status}
        </Typography>
        {feedback && (
          <Typography color={status === 'Approved' || status === 'Pending' ? 'success' : 'error'}>
            Feedback: {feedback}
          </Typography>
        )}
        {isI983 && (status === 'Approved' ||  status === 'Rejected') && (
          <div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileDownloadIcon />}
              href={downloadEmptyTemplateUrl}
              download
              sx={{ mt: 1, mr: 1 }}
            >
              Download Empty Template
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileDownloadIcon />}
              href={downloadSampleTemplateUrl}
              download
              sx={{ mt: 1 }}
            >
              Download Sample Template
            </Button>
          </div>
        )}
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id={`upload-${title}`}
          type="file"
          onChange={handleFileChange}
          disabled={status !== 'Approved' || uploading}
        />
        <label htmlFor={`upload-${title}`}>
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFileIcon />}
            disabled={status !== 'Approved' || uploading}
            sx={{ mt: 2 }}
          >
            Choose File
          </Button>
        </label>
        {uploading && <LinearProgress sx={{ mt: 1 }} />}
      </CardContent>
      <CardActions>
        <Button
          startIcon={<UploadFileIcon />}
          variant="contained"
          color="primary"
          onClick={uploadFile}
          disabled={!file || status !== 'Approved' || uploading}
        >
          Upload
        </Button>
      </CardActions>
    </Card>
  );
}

export default DocumentSection;
