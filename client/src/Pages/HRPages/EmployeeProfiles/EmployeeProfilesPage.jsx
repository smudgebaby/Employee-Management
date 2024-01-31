import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
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

  return (
    <>
    {loading? <LoadSpinner /> : (
    <Paper elevation={3} style={{ padding: '50px', marginTop: '20px' }}>
      <Typography variant="h4">Employee Profiles</Typography>
      <Typography variant="body1" paragraph>
        Total Number of Employees: {employees.length}
      </Typography>

      <List>
        {employees
          .sort((a, b) => a.lastName.localeCompare(b.lastName))
          .map((employee) => (
            <ListItem key={employee.id} disablePadding>
              <ListItemButton
                // to={`/employee/${employee.id}`}
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
          ))}
      </List>

      {selectedEmployee && (
        <EmployeeInfoForm
          formData={selectedEmployee}
          disable={true}
          page='onboarding'
        />
      )}
      
    </Paper>)}
    </>
  );
};

export default EmployeeProfilesPage;
