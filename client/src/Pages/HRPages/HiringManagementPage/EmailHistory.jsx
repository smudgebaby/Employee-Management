// EmailHistory.jsx
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// Assuming the existence of a service to fetch email history
// import { getEmailHistory } from '../Utils/backendUtil';

const EmailHistory = () => {
    const [emailHistory, setEmailHistory] = useState([]);

    useEffect(() => {
        const fetchEmailHistory = async () => {
            // Placeholder logic
            // const history = await getEmailHistory();
            // setEmailHistory(history);
            // Mock data for demonstration
            setEmailHistory([
                { email: 'john.doe@example.com', name: 'John Doe', link: 'https://example.com/register/abc123', status: 'Submitted' },
                { email: 'jane.doe@example.com', name: 'Jane Doe', link: 'https://example.com/register/def456', status: 'Not Submitted' }
            ]);
        };

        fetchEmailHistory();
    }, []);

    return (
        <List>
            {emailHistory.map((email, index) => (
                <ListItem key={index} divider>
                    <ListItemText
                        primary={`${email.name} (${email.email})`}
                        secondary={`Registration Link: ${email.link} - Status: ${email.status}`}
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
