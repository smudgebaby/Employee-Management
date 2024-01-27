import { TextField, Grid, Typography,  } from '@mui/material';


const Reference = ({ contactsData, handleChange, disable }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Reference</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth
          name="reference.firstName" label="First Name"
          value={contactsData.firstName} onChange={handleChange} disabled={disable}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth
          name="reference.lastName" label="Last Name"
          value={contactsData.lastName} onChange={handleChange} disabled={disable}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth
          name="reference.middleName" label="Middle Name"
          value={contactsData.middleName} onChange={handleChange} disabled={disable}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth
          name="reference.phone" label="Phone"
          value={contactsData.phone} onChange={handleChange} disabled={disable}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth
          name="reference.email" label="Email"
          value={contactsData.email} onChange={handleChange} disabled={disable}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth
          name="reference.relationship" label="Relationship"
          value={contactsData.relationship} onChange={handleChange} disabled={disable}
        />
      </Grid>
    </>
  )
}


export default Reference;
