// HiringManagementPage.jsx
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TokenGenerationForm from './TokenGenerationForm'; // Update path as necessary
import EmailHistory from './EmailHistory'; // Update path as necessary
import OnboardingApplications from "../../../Components/OnboardingApplications"; // Update path as necessary

const HiringManagementPage = () => {
    const [refreshHistory, setRefreshHistory] = useState(false);

    const handleEmailSent = () => {
        // Toggle the refreshHistory state to trigger a re-fetch in the EmailHistory component
        setRefreshHistory(!refreshHistory);
    };

    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Generate Token and Send Email</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TokenGenerationForm onEmailSent={handleEmailSent} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Email Send History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EmailHistory key={refreshHistory} /> {/* Use key to trigger re-render */}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Review Onboarding Applications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <OnboardingApplications />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default HiringManagementPage;
