import { useState, useEffect } from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import DocumentSection from '../../../Components/DocumentSection.jsx';
import { Container, Typography, Grid } from '@mui/material';

function VisaStatusPage() {
  const [docId, setDocId] = useState(null);
  const [documents, setDocuments] = useState([
    { key: 'optReceipt', title: 'OPT Receipt', status: 'Never Submit', feedback: null, uploading: false, isI983: false },
    { key: 'optEad', title: 'OPT EAD', status: 'Never Submit', feedback: null, uploading: false, isI983: false },
    { key: 'i983', title: 'I-983', status: 'Never Submit', feedback: null, uploading: false, isI983: true },
    { key: 'i20', title: 'I-20', status: 'Never Submit', feedback: null, uploading: false, isI983: false },
  ]);

  useEffect(() => {
    axios.get('http://localhost:3000/visa/getByUserId', {
      withCredentials: true
    })
    .then(response => {
      const visaData = response.data[0];
      // console.log(visaData);
      setDocId(visaData._id);
      setDocuments([
        { key: 'optReceipt', title: 'OPT Receipt', uploading: false, isI983: false, ...visaData.optReceipt },
        { key: 'optEad', title: 'OPT EAD', uploading: false, isI983: false, ...visaData.optEad },
        { key: 'i983', title: 'I-983', uploading: false, isI983: true, ...visaData.i983 },
        { key: 'i20', title: 'I-20', uploading: false, isI983: false, ...visaData.i20 },
      ]);
    })
    .catch(error => {
      console.error('Error fetching visa status:', error);
    });
  }, []);


  const handleUpload = (docKey, file, visaId) => {
    const formData = new FormData();
    formData.append('file', file);

    setDocumentUploadingState(docKey, true);

    axios.post('http://localhost:3000/file/upload', formData)
    .then(response => {
      const documentName = response.data.documentName;
      console.log('....'+documentName);
      return axios.post(`http://localhost:3000/visa/update/${visaId}`, {
        [docKey]: {
          status: "Pending",
          feedback: "Please wait for HR to review your application.",
          fileUrl: `/${documentName}`
        }
      });
    })
    .then(updateResponse => {
      // Handle successful update
      console.log('MongoDB updated successfully', updateResponse);
      setDocumentData(docKey, updateResponse.data[docKey]);
    })
    .catch(error => {
      console.error('Error processing file upload:', error);
      setDocumentUploadingState(docKey, false);
    });
  };

  const handleDownload = () => {
    axios.get('http://localhost:3000/file/download/google%2B%20pre.docx', {
      responseType: 'blob',
    })
    .then((response) => {
      FileDownload(response.data, 'template.docx');
    })
    .catch((error) => {
      console.error('Error downloading the file', error);
    });
  }

  const setDocumentUploadingState = (docKey, isUploading) => {
    setDocuments(prevDocs => prevDocs.map(doc => doc.key === docKey ? { ...doc, uploading: isUploading } : doc));
  };

  const setDocumentData = (docKey, data) => {
    setDocuments(prevDocs => prevDocs.map(doc => doc.key === docKey ? { ...doc, ...data, uploading: false } : doc));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Visa Status Management</Typography>
      <Grid container spacing={6}>
        {documents.map((doc) => (
          <Grid item xs={12} key={doc.key}>
            <DocumentSection
              title={doc.title}
              onUpload={(file) => handleUpload(doc.key, file, docId)}
              onDownload={handleDownload}
              status={doc.status}
              feedback={doc.feedback}
              uploading={doc.uploading}
              isI983={doc.isI983}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default VisaStatusPage;
