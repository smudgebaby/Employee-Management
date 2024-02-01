import {useEffect, useState} from 'react';
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import './DocumentPreviewModal.css';
import axios from 'axios';

function DocumentPreviewModal({
  // eslint-disable-next-line react/prop-types
  setModalOpen, documentUrl, documentType, visaId,
}) {
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/file/show${documentUrl}`).
      then((response) => {
        setFileUrl(response.data);
      }).
      catch((error) => {
        console.error('Error downloading the file', error);
      });
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const onSubmit = () => {
    let payload = {
      [documentType]: {
        'status': status,
        'feedback': feedback,
        'fileUrl': documentUrl
      }
    };

    // Determine the next document type and status based on the current document type
    if (status === 'Approved') {
      const nextDocType = documentType === 'optReceipt' ? 'optEad' :
        documentType === 'optEad' ? 'i983' :
          documentType === 'i983' ? 'i20' : '';
      const nextDocStatus = 'Please Submit';

      // If there is a next document type, add it to the payload
      if (nextDocType !== '') {
        payload[nextDocType] = { 'status': nextDocStatus };
      }
    }

    axios.post(`http://localhost:3000/visa/update/${visaId}`, payload)
    .then((response) => {
      alert('Update successful');
      setModalOpen(false);
    })
    .catch(error => {
      console.error('Error submitting feedback', error);
      alert('Update failed');
    });
  };


  return (
    <div className="modal-container">
      <div className="content-container">
        <Box>
          <iframe src={fileUrl} title="Document Preview"
                  className="preview-document"/>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} label="Status"
                    onChange={handleStatusChange}>
              <MenuItem value="Approved">Approve</MenuItem>
              <MenuItem value="Rejected">Reject</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Feedback"
            multiline
            rows={1}
            value={feedback}
            onChange={handleFeedbackChange}
            margin="normal"
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained" color="primary"
                  className="modal-button">Submit</Button>
        </Box>
        <Button onClick={() => setModalOpen(false)} variant="contained"
                color="error" className="modal-button">Close</Button>
      </div>
    </div>

  );
}

export default DocumentPreviewModal;