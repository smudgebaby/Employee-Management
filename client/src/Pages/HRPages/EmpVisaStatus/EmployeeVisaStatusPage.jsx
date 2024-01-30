import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Paper, Stack, Switch,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import './EmployeeVisaStatusPage.css';
import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
    boxSizing: 'border-box',
  },
}));

function EmployeeVisaStatusPage() {
  const [isAll, setIsAll] = useState(true);
  const [employees, setEmployees] = useState([]); // This will hold the employee data
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log(';...');
  }, [isAll]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // TODO: Implement search functionality
  };

  const handleTypeChange = (event) => {
    setIsAll(event.target.checked);
  }

  return (
    <div className="centered-container">
      <Container >
        <Typography variant="h4" gutterBottom>Visa Status Management</Typography>
        <Stack direction='row' sx={{
          height: 1/8,
          display: 'flex',
          alignItems: 'center'
        }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{
            width: 1/4
          }}>
            <Typography>In Progress</Typography>
            <AntSwitch onChange={handleTypeChange} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
            <Typography>All</Typography>
          </Stack>
          { isAll && <TextField label="Search Employees" variant="outlined" fullWidth
                                margin="normal" onChange={handleSearchChange}/> }
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Work Authorization Title</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Days Remaining</TableCell>
                <TableCell>Next Steps</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  {/* Other cells */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default EmployeeVisaStatusPage;