import React from 'react';
import { TextField, Button, Grid, Typography,  } from '@mui/material';


const EmergencyContacts = ({ contactsData, handleChange, disable, handleAddEmergencyContact }) => {
  return (
    <>
      {/* Emergency contacts */}
        <Grid item xs={12}>
          <Typography variant="h6">Emergency contacts</Typography>
        </Grid>
        {contactsData.map((emergencyContact, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12}>
              <Typography variant="h8">contact {index+1}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name={`emergencyContacts[${index}].firstName`} label="First Name"
                value={emergencyContact.firstName} onChange={handleChange} disabled={disable} 
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name={`emergencyContacts[${index}].lastName`} label="Last Name"
                value={emergencyContact.lastName} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name={`emergencyContacts[${index}].middleName`} label="Middle Name"
                value={emergencyContact.middleName} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name={`emergencyContacts[${index}].phone`} label="Phone"
                value={emergencyContact.phone} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name={`emergencyContacts[${index}].email`} label="Email"
                value={emergencyContact.email} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name={`emergencyContacts[${index}].relationship`} label="Relationship"
                value={emergencyContact.relationship} onChange={handleChange} disabled={disable}
              />
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddEmergencyContact}
            disabled={disable}
          >
            Add Emergency Contact
          </Button>
        </Grid>
    </>
  )
}


export default EmergencyContacts;
