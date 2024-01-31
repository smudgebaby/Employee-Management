import {useEffect, useState} from 'react';
import { Button, Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import './DocumentPreviewModal.css';
import axios from 'axios';
// eslint-disable-next-line react/prop-types
function DocumentPreviewModal({ setModalOpen, documentUrl, documentType, visaId }) {
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/file/show${documentUrl}`)
    .then((response) => {
      setFileUrl(response.data);
    })
    .catch((error) => {
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
    axios.post(`http://localhost:3000/visa/update/${visaId}`, {
      [documentType]: {
        'status': status,
        'feedback': feedback
      }
    }).then((response) => {

    });
    setModalOpen(false);
  };

  return (
    <div className='modal-container'>
      <div className='content-container'>
        <Box>
          <iframe src={fileUrl} title="Document Preview" className='preview-document'/>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} label="Status" onChange={handleStatusChange}>
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
          <Button onClick={onSubmit} variant="contained" color="primary" className='modal-button'>Submit</Button>
        </Box>
        <Button onClick={() => setModalOpen(false)} variant="contained" color="error" className='modal-button'>Close</Button>
      </div>
    </div>

  );
}


export default DocumentPreviewModal;