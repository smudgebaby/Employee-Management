import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Button,
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
import axios from 'axios';
import DocumentPreviewModal from '../../../Components/DocumentPreviewModal/DocumentPreviewModal.jsx';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [visaId, setVisaId] = useState('');

  const handlePreviewClick = (file, type, id) => {
    setSelectedDocumentUrl(file);
    setSelectedDocumentType(type);
    setVisaId(id);
    setModalOpen(true);
  }

  const determineOnboardingNextStep = (employee) => {
    if (employee.onboardingStatus === 'Never Submit' || employee.onboardingStatus === 'Rejected') {
      return {message: 'Submit Onboarding Application'};
    }
    if (employee.onboardingStatus === 'Pending') {
      return {message: 'Wait For HR Approval', fileUrl: employee.visaStatus.optReceipt.fileUrl, fileType: 'optReceipt', visaId: employee.visaStatus._id}
    }
    return null;
  }

  const determineVisaStatusNextStep = (visaStatus, documentType) => {
    if (visaStatus[documentType].status === 'Never Submit' || visaStatus[documentType].status === 'Rejected') {
      return {message: `Submit ${documentType.replace(/([A-Z])/g, ' $1').trim()}`};
    }
    if (visaStatus[documentType].status === 'Pending') {
      return {message: 'Wait For HR Approval', fileUrl: visaStatus[documentType]?.fileUrl, fileType: documentType, visaId: visaStatus._id};
    }
    return null;
  }

  const determineEmployeeNextStep = (employee) => {
    let nextStep = determineOnboardingNextStep(employee);
    if (nextStep) return nextStep;

    const visaDocuments = ['optReceipt', 'optEad', 'i983', 'i20'];
    for (const doc of visaDocuments) {
      nextStep = determineVisaStatusNextStep(employee.visaStatus, doc);
      if (nextStep) return nextStep;
    }

    return 'Complete';
  }

  useEffect(() => {
    axios.get('http://localhost:3000/user/getAllInProgress', {
      withCredentials: true
    })
    .then(response => {
      let empData = response.data;
      empData = empData.filter((employee) => employee.visaStatus !== undefined && employee.personalInformation !== undefined && employee.personalInformation.employment !== undefined);
      console.log(empData);
      empData.map((employee) => {
        employee.name = `${employee.personalInformation.firstName} ${employee.personalInformation.middleName} ${employee.personalInformation.lastName}`;
        employee.title = employee.personalInformation.employment.visaTitle;
        employee.startDate = new Date(employee.personalInformation.employment.startDate).toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        employee.endDate = new Date(employee.personalInformation.employment.endDate).toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        employee.remaining = (new Date(employee.personalInformation.employment.endDate) - new Date(employee.personalInformation.employment.startDate)) / (1000 * 3600 * 24);
        employee.nextStep = determineEmployeeNextStep(employee);
      });
      setEmployees(empData);
    })
    .catch(error => {
      console.error('Error fetching records:', error);
    });
  }, [isAll, modalOpen]);

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
                <TableRow key={employee._id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.title}</TableCell>
                  <TableCell>{employee.startDate}</TableCell>
                  <TableCell>{employee.endDate}</TableCell>
                  <TableCell>{employee.remaining}</TableCell>
                  <TableCell>{employee.nextStep.message}</TableCell>
                  <TableCell>{employee.nextStep.fileUrl ? <Button sx={{
                    width: 1
                  }} onClick={() => handlePreviewClick(employee.nextStep.fileUrl, employee.nextStep.fileType, employee.nextStep.visaId)}>Preview</Button> : <Button sx={{
                    width: 1
                  }}>Send Notification</Button>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {modalOpen &&
        <DocumentPreviewModal
          setModalOpen={setModalOpen}
          documentUrl={selectedDocumentUrl}
          documentType={selectedDocumentType}
          visaId={visaId}
        />
      }
    </div>
  );
}

export default EmployeeVisaStatusPage;