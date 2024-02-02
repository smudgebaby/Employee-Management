// EmailHistory.jsx
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const EmailHistory = () => {
    const [emailHistory, setEmailHistory] = useState([]);

    useEffect(() => {
        const fetchEmailHistory = async () => {
            try {
              // Adjust the URL to match your server configuration
              const response = await axios.get('http://localhost:3000/user/getTokens');
              setEmailHistory(response.data);
            } catch (error) {
              console.error('Failed to fetch email history:', error);
            }
          };
      
          fetchEmailHistory();
        }, []);

    return (
        <List>
            {emailHistory.map((email, index) => (
                <ListItem key={index} divider>
                    <ListItemText
                        primary={`${email.email}`}
                        secondary={`Registration Token: ${email.token} - Status: ${email.status}`}
                    />
                </ListItem>
            ))}
            {emailHistory.length === 0 && (
                <Typography variant="body1">No history available.</Typography>
            )}
        </List>
    );
};

export default EmailHistory;
