import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
const OnboardingApplications = () => {
    const [pendingApplications, setPendingApplications] = useState([]);
    const [rejectedApplications, setRejectedApplications] = useState([]);
    const [approvedApplications, setApprovedApplications] = useState([]);
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [rejectFeedback, setRejectFeedback] = useState('');
  
    useEffect(() => {
      fetchApplications();
      console.log('pending:', pendingApplications);
      console.log('approved:', approvedApplications);
      console.log('rejected:', rejectedApplications);
    }, []);
  
    const fetchApplications = async () => {
        try {
          const pending = await axios.get('http://localhost:3000/user/pending', {
            withCredentials: true
          });
          setPendingApplications(pending.data);
          
          const rejected = await axios.get('http://localhost:3000/user/rejected', {
            withCredentials: true
          });
          setRejectedApplications(rejected.data);
          
          const approved = await axios.get('http://localhost:3000/user/approved', {
            withCredentials: true
          });
          setApprovedApplications(approved.data);
        } catch (error) {
          console.error('Failed to fetch applications', error);
        }
      };
    
      const handleApprove = async (userId) => {
        try {
          await axios.post('http://localhost:3000/user/approve', { userId , withCredentials: true});
          fetchApplications(); // Refresh the applications after action
        } catch (error) {
          console.error('Failed to approve application', error);
        }
      };
  
    const handleOpenRejectDialog = (userId) => {
      setCurrentUserId(userId);
      setOpenRejectDialog(true);
    };
  
    const handleReject = async () => {
      try {
        await axios.post('http://localhost:3000/user/reject', { userId: currentUserId, feedback: rejectFeedback, withCredentials: true });
        setOpenRejectDialog(false); // Close the dialog
        setRejectFeedback(''); // Reset feedback input
        fetchApplications(); // Refresh applications
      } catch (error) {
        console.error('Failed to reject application', error);
      }
    };
  
    const handleClose = () => {
      setOpenRejectDialog(false);
      setRejectFeedback('');
    };
  
    const ApplicationSection = ({ title, applications, showActions }) => (
      <>
        <Typography variant="h6" component="div" sx={{ mt: 4, mb: 2 }}>
          {title}
        </Typography>
        <List>
          {applications.map((app) => (
            <React.Fragment key={app._id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={app.personalInformation?.firstName + app.personalInformation?.lastName} // Adjust based on your data structure
                  secondary={app.email}
                />
                <Button onClick={() => window.open(`/review-application/${app._id}`, '_blank')}>View Application</Button>
                {showActions && (
                  <>
                    <Button onClick={() => handleApprove(app._id)}>Approve</Button>
                    <Button onClick={() => handleOpenRejectDialog(app._id)}>Reject</Button>
                  </>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </>
    );
  
    return (
      <div>
        <ApplicationSection title="Pending Applications" applications={pendingApplications} showActions={true} />
        <ApplicationSection title="Rejected Applications" applications={rejectedApplications} />
        <ApplicationSection title="Approved Applications" applications={approvedApplications} />
  
        <Dialog open={openRejectDialog} onClose={handleClose}>
          <DialogTitle>Reject Application</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To reject this application, please provide feedback below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="feedback"
              label="Feedback"
              type="text"
              fullWidth
              variant="outlined"
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleReject}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
export default OnboardingApplications;