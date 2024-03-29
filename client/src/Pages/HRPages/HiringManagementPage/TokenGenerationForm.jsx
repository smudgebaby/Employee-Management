// TokenGenerationForm.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
// Assuming the existence of a service to generate token, send email, and update the history

const TokenGenerationForm = ({ onEmailSent }) => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        console.log(email);
        event.preventDefault();
        const tokenUrl = `http://localhost:3000/user/generate-registration-token`;  
        const response = await axios.post(tokenUrl, {
          withCredentials: true,
          email: email
        });
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
