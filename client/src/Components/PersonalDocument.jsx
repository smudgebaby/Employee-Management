import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, Button, Typography, Dialog, AppBar, Toolbar, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; 
import FileDownload from 'js-file-download';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PersonalDocument = ({ documentId }) => {
  const [documentData, setDocumentData] = useState({ url: '', type: '' });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [fileName, setFileName] = useState("");
  useEffect(() => {
    const documentUrl = `http://localhost:3000/documents/${documentId}`;
    
    const fetchDocumentData = async () => {
      try {
        const response = await axios.get(documentUrl);
        if (response.data && response.data.fileURL) {
          // Extract the filename from the fileURL
          const filename = response.data.fileURL;
          setFileName(filename);
          // Call the /show/:filename endpoint to get the presigned URL
          const presignedUrlResponse = await axios.get(`http://localhost:3000/file/show${filename}`);
          const presignedUrl = presignedUrlResponse.data; 
          setDocumentData({
            url:  presignedUrl,
            type: response.data.type 
          });
          const fileType = filename.split('.').pop();
          console.log('filename', filename);
          setDocumentType(fileType);
        }
      } catch (error) {
        console.error('Failed to fetch document data:', error);
      }
    };

    fetchDocumentData();
  }, [documentId]);

  const openPreview = () => {
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };
  const handleDownload = () => {
    axios.get(`http://localhost:3000/file/download${fileName}`, {
      responseType: 'blob',
    })
    .then((response) => {
      FileDownload(response.data, documentId + '.' + documentType);
    })
    .catch((error) => {
      console.error('Error downloading the file', error);
    });
  }
  const isImage = (type) => {
    return ['jpg', 'jpeg', 'png', 'gif'].includes(type.toLowerCase());
  };
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Document: {documentData.type}
        </Typography>
        <Typography variant="body2">
          Document ID: {documentId}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={openPreview}>Preview</Button>
        <Button size="small" onClick={handleDownload}>
          Download
        </Button>
      </CardActions>
      <Dialog fullScreen open={previewOpen} onClose={closePreview} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative'}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={closePreview} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Preview
            </Typography>
          </Toolbar>
        </AppBar>
        {documentData.url && (
          isImage(documentType) ? 
          <img src={documentData.url} alt="Document Preview" style={{ maxWidth: '80%', maxHeight: '80%', display: 'block', margin: 'auto' }} /> :
          <iframe src={documentData.url} width="100%" height="100%" style={{ marginTop: '0px' }} />
        )}
      </Dialog>
    </Card>
  );
};

export default PersonalDocument;
