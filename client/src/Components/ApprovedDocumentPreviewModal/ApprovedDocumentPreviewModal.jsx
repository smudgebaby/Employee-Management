import {useEffect, useState} from 'react';
import {
  Button,
  Box,
} from '@mui/material';
import './ApprovedDocumentPreviewModal.css';
import axios from 'axios';
import FileDownload from 'js-file-download';

// eslint-disable-next-line react/prop-types
function ApprovedDocumentPreviewModal({ setApprovedModalOpen, documentUrls }) {
  const [fileUrls, setFileUrls] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (documentUrls && documentUrls.length > 0) {
      axios.post(`http://localhost:3000/file/showMultiple`, { keys: documentUrls })
      .then(response => {
        setFileUrls(response.data);
      })
      .catch(error => console.error('Error downloading the file', error));
    } else {
      setFileUrls([]);
    }
  }, [documentUrls]);

  const handleDownload = (url) => {
    axios.get(`http://localhost:3000/file/download${url}`, {
      responseType: 'blob',
    })
    .then((response) => {
      FileDownload(response.data, url);
    })
    .catch((error) => {
      console.error('Error downloading the file', error);
    });
  }

  return (
    <div className="modal-container">
      <div className="content-container">
        <Box>
          {fileUrls.length > 0 ? (
            fileUrls.map((url, index) => (
              <>
                <iframe
                  key={index}
                  src={url}
                  title={`Document Preview ${index}`}
                  className="preview-document"
                />
                <Button onClick={() => handleDownload(documentUrls[index])}>Download</Button>
              </>
            ))
          ) : (
            <p>No documents to display.</p>
          )}
        </Box>
        <Button sx={{
          marginTop: 1
        }} onClick={() => setApprovedModalOpen(false)} variant="contained" color="error" className="modal-button">
          Close
        </Button>
      </div>
    </div>
  );
}

export default ApprovedDocumentPreviewModal;
