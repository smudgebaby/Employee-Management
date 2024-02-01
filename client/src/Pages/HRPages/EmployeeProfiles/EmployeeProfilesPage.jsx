import React from 'react';
import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Button, Collapse, TextField  } from '@mui/material';
import EmployeeInfoForm from '../../../Components/EmployeeInfoForm.jsx'
import LoadSpinner from '../../../Components/LoadSpinner/LoadSpinner.jsx';
import ListItemButton from '@mui/material/ListItemButton';

const EmployeeProfilesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/info/getAll'); 
        const data = await response.json();
        setEmployees(data.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseForm = () => {
    setSelectedEmployee(null);
  };

  /* handle search */
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const filteredEmployees = employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName} ${employee.preferredName}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredResults(filteredEmployees);
  }, [searchQuery, employees]);

  return (
    <>
      {loading? <LoadSpinner /> : (
        <Paper elevation={3} style={{ padding: '50px', marginTop: '20px' }}>
          <Typography variant="h4">Employee Profiles</Typography>
          <Typography variant="body1" paragraph>
            Total Number of Employees: {employees.length}
          </Typography>


          <TextField
            label="Search Employees"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <List>
            {searchQuery !== '' && filteredResults.length === 0 ? (
                <Typography variant="body2">No results found</Typography>
            ) : (

            filteredResults
              .sort((a, b) => a.lastName.localeCompare(b.lastName))
              .map((employee) => (
                <React.Fragment key={employee.id}>

                  <ListItem key={employee.id} disablePadding>
                    <ListItemButton
                      target="_blank"
                      style={{ textDecoration: 'none' }}
                      onClick={() => handleEmployeeClick(employee)}
                    >
                      <ListItemText
                        primary={`${employee.lastName}, ${employee.firstName}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="textSecondary">
                              SSN: {employee.ssn} | Work Authorization Title: {employee.workAuthorization.workAuthorizationType} | 
                              Phone Number: {employee.cellPhoneNumber} | Email: {employee.email}
                            </Typography>
                            
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={selectedEmployee === employee}  timeout="auto" unmountOnExit>
                    {selectedEmployee && (
                      <>
                      <EmployeeInfoForm formData={selectedEmployee} disable={true} page='onboarding' />
                      <Button onClick={handleCloseForm}>Close Form</Button>
                      </>
                    )}
                  </Collapse>

                </React.Fragment>
              ))

            )}
          </List>
          
        </Paper>)
      }
    </>
  );
};

export default EmployeeProfilesPage;
