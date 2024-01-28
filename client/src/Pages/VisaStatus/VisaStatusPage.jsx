import { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentSection from '../../Components/DocumentSection.jsx';
import { Container, Typography, Grid } from '@mui/material';

function VisaStatusPage() {
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


  const handleUpload = (docKey, file) => {
    const formData = new FormData();
    formData.append('file', file);

    // Start uploading (set uploading to true)
    const updatedDocuments = documents.map(doc =>
      doc.key === docKey ? { ...doc, uploading: true } : doc
    );
    setDocuments(updatedDocuments);

    axios.post(`/api/visaStatus/upload/${docKey}`, formData)
    .then(response => {
      // Assuming the response includes the updated document data
      const updatedDocData = response.data;

      const updatedDocuments = documents.map(doc =>
        doc.key === docKey ? { ...doc, ...updatedDocData, uploading: false } : doc
      );
      setDocuments(updatedDocuments);
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      // Handle upload errors here
      const updatedDocuments = documents.map(doc =>
        doc.key === docKey ? { ...doc, uploading: false } : doc
      );
      setDocuments(updatedDocuments);
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Visa Status Management
      </Typography>
      <Grid container spacing={6}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={12} md={12} key={doc.key}>
            <DocumentSection
              title={doc.title}
              onUpload={(file) => handleUpload(doc.key, file)}
              status={doc.status}
              feedback={doc.feedback}
              uploading={doc.uploading}
              isI983={doc.isI983}
              downloadEmptyTemplateUrl="/path/to/empty-i983.pdf"
              downloadSampleTemplateUrl="/path/to/sample-i983.pdf"
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default VisaStatusPage;
