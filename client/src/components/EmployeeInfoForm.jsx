import React from 'react';
import { Container, Paper, TextField, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useState } from 'react';

const EmployeeInformationForm = ({formData, handleChange, disable}) => {

  const handleSubmit = (event) => {
    event.preventDefault()
  }


  console.log(formData)

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Employee Information Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name */}
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="First Name" variant="outlined" name="firstName" 
              value={formData.firstName} onChange={handleChange} required disabled={disable} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Last Name" variant="outlined" name="lastName" 
              value={formData.lastName} onChange={handleChange} required disabled={disable} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Middle Name" variant="outlined" name="middleName" 
              value={formData.middleName} onChange={handleChange} disabled={disable} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Preferred Name" variant="outlined" name="preferredName" 
              value={formData.preferredName} onChange={handleChange} disabled={disable} />
            </Grid>

            <Grid item xs={12} sm={4}>
              {/* Profile picture upload */}
              {/* react-dropzone for file uploads */}
            </Grid>
            
            {/* Address */}
            <Grid item xs={6}>
              <TextField fullWidth label="Street" variant="outlined" name="address.street" 
                value={formData.address.street} onChange={handleChange} required disabled={disable} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Building" variant="outlined" name="address.building" 
                value={formData.address.building} onChange={handleChange} disabled={disable} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" variant="outlined" name="address.city" 
                value={formData.address.city} onChange={handleChange} required disabled={disable} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="State" variant="outlined" name="address.state" 
                value={formData.address.state} onChange={handleChange} required disabled={disable} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="ZIP" variant="outlined" name="address.zip" 
                value={formData.address.zip} onChange={handleChange} required disabled={disable} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" variant="outlined" name="email" 
              value={formData.email} onChange={handleChange} disabled required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Cell Phone Number" variant="outlined" name="cellPhoneNumber" 
              value={formData.cellPhoneNumber} onChange={handleChange} required disabled={disable} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Work Phone Number" variant="outlined" name="workPhoneNumber" 
              value={formData.workPhoneNumber} onChange={handleChange} disabled={disable} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="Date of Birth" variant="outlined" name="dateOfBirth" 
              value={formData.dateOfBirth} onChange={handleChange} required disabled={disable} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="SSN" variant="outlined" name="ssn" 
              value={formData.ssn} onChange={handleChange} required disabled={disable} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset"  disabled={disable}>
                <RadioGroup row aria-label="gender" name="gender" value={formData.gender} onChange={handleChange}>
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="I do not wish to answer" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Work auth */}
            <Grid item xs={12}>
              <FormControl component="fieldset"  disabled={disable}>
                <Typography variant="subtitle1" gutterBottom>
                  Are you a permanent resident or citizen of the U.S.?
                </Typography>
                <RadioGroup row aria-label="citizenship" name="citizenship" value={formData.citizenship} onChange={handleChange}>
                  <FormControlLabel value="Citizen" control={<Radio />} label="Citizen" />
                  <FormControlLabel value="GreenCard" control={<Radio />} label="Green Card" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* Work auth if not a citizen or green card holder */}
            {formData.citizenship === 'Other' && (
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">Work Authorization</Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined"  disabled={disable}>
                    <InputLabel id="workAuthorizationType-label">Work Authorization Type</InputLabel>
                    <Select
                      labelId="workAuthorizationType-label"
                      label="Work Authorization Type"
                      name="workAuthorizationType"
                      value={formData.workAuthorizationType}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="H1-B">H1-B</MenuItem>
                      <MenuItem value="L2">L2</MenuItem>
                      <MenuItem value="F1(CPT/OPT)">F1(CPT/OPT)</MenuItem>
                      <MenuItem value="H4">H4</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth type="date" label="Start Date" variant="outlined" name="startWorkAuthorizationDate" 
                    value={formData.startWorkAuthorizationDate} onChange={handleChange} required disabled={disable} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth type="date" label="End Date" variant="outlined" name="endWorkAuthorizationDate" 
                    value={formData.endWorkAuthorizationDate} onChange={handleChange} required disabled={disable} />
                </Grid>
              </Grid>
            )}
 
            {/* Reference */}
            <Grid item xs={12}>
              <Typography variant="h6">Reference</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name="reference.firstName" label="First Name"
                value={formData.reference.firstName} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name="reference.lastName" label="Last Name"
                value={formData.reference.lastName} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name="reference.middleName" label="Middle Name"
                value={formData.reference.middleName} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name="reference.phone" label="Phone"
                value={formData.reference.phone} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name="reference.email" label="Email"
                value={formData.reference.email} onChange={handleChange} disabled={disable}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth
                name="reference.relationship" label="Relationship"
                value={formData.reference.relationship} onChange={handleChange} disabled={disable}
              />
            </Grid>


            {/* Emergency contacts */}
            <Grid item xs={12}>
              <Typography variant="h6">Emergency contacts</Typography>
            </Grid>
            {formData.emergencyContacts.map((emergencyContact, index) => (
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

          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EmployeeInformationForm;
