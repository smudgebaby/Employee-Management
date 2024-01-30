import './App.css'
import Dashboard from './Components/Dashboard.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import VisaStatusPage from './Pages/EmployeePages/VisaStatus/VisaStatusPage.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import Login from './Pages/Login/Login.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Error from './Pages/Error/Error.jsx'
import OnboardApplication from './Pages/EmployeePages/OnboardApplication/OnboardApplication.jsx'
import PersonalInfo from './Pages/EmployeePages/PersonalInfo/PersonalInfo.jsx'
import DocumentPage from './Pages/EmployeePages/DocumentPage.jsx';
import {PrivateRoute} from './Components/PrivateRoute';
import EmployeeVisaStatusPage
  from './Pages/HRPages/EmpVisaStatus/EmployeeVisaStatusPage.jsx';

function App() {

  return (
      <Router>
        <Dashboard>
          <Routes>
            <Route path="/visa-status" element={<PrivateRoute requiredRole='Employee'><VisaStatusPage /></PrivateRoute>} />
            <Route path="/employee-visa-status" element={<PrivateRoute requiredRole='HR'><EmployeeVisaStatusPage /></PrivateRoute>} />
            <Route path="/forbidden" element={<Error>You are not allowed to access this page!</Error>} />
            <Route path="/" element={<PrivateRoute requiredRole=''><HomePage /></PrivateRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/OnboardApplication' element={<OnboardApplication />} />
            <Route path='/PersonalInfo' element={<PersonalInfo />} />
            <Route path='/personal-document' element={<DocumentPage />} />
            <Route path='*' element={<Error>Oops, something went wrong!</Error>} />
          </Routes>
        </Dashboard>
      </Router>
  )
}

export default App
