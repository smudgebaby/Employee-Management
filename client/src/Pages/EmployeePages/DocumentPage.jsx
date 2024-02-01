import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonalDocument from "../../Components/PersonalDocument.jsx";
import { Container, Typography, Grid } from '@mui/material';

const DocumentPage = () => {
    // Adjusting state to hold documents in an object by type
    const [documentsByType, setDocumentsByType] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/documents/getByUserId', {
            withCredentials: true
        })
        .then(response => {
            // Adjusting here to handle the response as an object, not an array
            setDocumentsByType(response.data);
            // console.log('response:', response.data);
        })
        .catch(error => {
            console.error("Error fetching documents:", error);
        });
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Personal Documents
            </Typography>
            <Grid container spacing={6}>
                {Object.entries(documentsByType).map(([type, document]) => (
                    <Grid item xs={12} sm={12} md={12} key={type}>
                        <Typography variant="h6">{type}</Typography>
                        <PersonalDocument documentId={document._id} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default DocumentPage;