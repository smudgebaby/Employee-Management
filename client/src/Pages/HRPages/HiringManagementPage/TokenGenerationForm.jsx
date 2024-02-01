// TokenGenerationForm.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Assuming the existence of a service to generate token, send email, and update the history
// import { generateTokenAndSendEmailAndUpdateHistory } from '../Utils/backendUtil';

const TokenGenerationForm = ({ onEmailSent }) => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call your API or utility function here
        // const result = await generateTokenAndSendEmailAndUpdateHistory(email);
        // Placeholder action
        alert('Token generated and email sent!');
        onEmailSent(); // Notify parent component to refresh email history
        setEmail(''); // Reset email field after submission
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Generate and Send
            </Button>
        </form>
    );
};

export default TokenGenerationForm;
